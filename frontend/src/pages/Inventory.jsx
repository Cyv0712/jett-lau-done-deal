import { useState, useEffect, useMemo } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { FaTag, FaRoad, FaCalendarAlt, FaFilter, FaInfoCircle, FaSearch, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SkeletonCard from '../components/SkeletonCard';
import { apiUrl, toAbsoluteUploadUrl } from '../config/api';

// --- Helper ---
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseFloat(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
};

// Append unit suffix only if not already present
const withUnit = (value, suffix) => {
  if (!value) return '—';
  const str = String(value).trim();
  if (str.toLowerCase().endsWith(suffix.toLowerCase())) return str;
  return `${str} ${suffix}`;
};

// Prefix ₱ only if not already present
const withPeso = (value) => {
  if (!value) return '—';
  const str = String(value).trim();
  return str.startsWith('₱') ? str : `₱${str}`;
};

const INITIAL_FILTERS = { search: '', brand: 'All', type: 'All', priceMin: '', priceMax: '' };

const Inventory = () => {
  const [bikesData, setBikesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    const MIN_SKELETON_MS = 900;
    const startedAt = Date.now();

    const finishLoading = () => {
      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_SKELETON_MS - elapsed);
      setTimeout(() => setLoading(false), remaining);
    };

    fetch(apiUrl('/api/bikes'))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const availableOnly = data.filter(b => b.status === 'Available' || !b.status);
          setBikesData(availableOnly);
        } else {
          console.error('API Error: Expected array but received:', data);
          setBikesData([]);
        }
        finishLoading();
      })
      .catch((err) => {
        console.error(err);
        finishLoading();
      });
  }, []);

  // Derive unique brand/type options dynamically from actual DB data
  const brands = useMemo(
    () => ['All', ...new Set(bikesData.map((b) => b.brand).filter(Boolean))].sort(),
    [bikesData]
  );
  const types = useMemo(
    () => ['All', ...new Set(bikesData.map((b) => b.type).filter(Boolean))].sort(),
    [bikesData]
  );
  const priceRange = useMemo(() => {
    if (!bikesData.length) return { min: 0, max: 0 };
    const prices = bikesData.map((b) => parsePrice(b.price));
    return { min: Math.min(...prices), max: Math.max(...prices) };
  }, [bikesData]);

  // Apply all filters in a single pass
  const filteredBikes = useMemo(() => {
    const searchTerm = filters.search.toLowerCase();
    const priceMin = filters.priceMin !== '' ? parseFloat(filters.priceMin) : null;
    const priceMax = filters.priceMax !== '' ? parseFloat(filters.priceMax) : null;

    return bikesData.filter((bike) => {
      const matchesSearch =
        !searchTerm ||
        bike.brand?.toLowerCase().includes(searchTerm) ||
        bike.model?.toLowerCase().includes(searchTerm) ||
        bike.type?.toLowerCase().includes(searchTerm);
      const matchesBrand = filters.brand === 'All' || bike.brand === filters.brand;
      const matchesType = filters.type === 'All' || bike.type === filters.type;
      const bikePrice = parsePrice(bike.price);
      const matchesPriceMin = priceMin === null || bikePrice >= priceMin;
      const matchesPriceMax = priceMax === null || bikePrice <= priceMax;
      return matchesSearch && matchesBrand && matchesType && matchesPriceMin && matchesPriceMax;
    });
  }, [bikesData, filters]);

  const setFilter = (key, value) => setFilters((prev) => ({ ...prev, [key]: value }));
  const clearAllFilters = () => setFilters(INITIAL_FILTERS);

  // Active filter chips for UX feedback
  const activeChips = [
    filters.search && { key: 'search', label: `"${filters.search}"` },
    filters.brand !== 'All' && { key: 'brand', label: filters.brand },
    filters.type !== 'All' && { key: 'type', label: filters.type },
    filters.priceMin && { key: 'priceMin', label: `Min ₱${Number(filters.priceMin).toLocaleString()}` },
    filters.priceMax && { key: 'priceMax', label: `Max ₱${Number(filters.priceMax).toLocaleString()}` },
  ].filter(Boolean);

  // Returns a displayable URL for the first image — supports both old single-image and new images[] schema
  const getImageUrl = (bike) => {
    const src = Array.isArray(bike.images) && bike.images.length > 0
      ? bike.images[0]
      : bike.image; // backwards compat
    return toAbsoluteUploadUrl(src);
  };

  const sidebarStyle = {
    backgroundColor: 'var(--bg-card)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)',
    padding: '24px',
    position: 'sticky',
    top: '100px',
  };

  const inputStyle = {
    backgroundColor: '#0a0a0a',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
  };

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <Container>
        {/* Page Header */}
        <div className="mb-5 text-center">
          <span className="hero-subtitle" style={{ fontSize: '1rem' }}>FULL INVENTORY</span>
          <h1 className="section-title mb-0">FIND YOUR <span className="text-accent">NEXT RIDE</span></h1>
        </div>

        {/* Disclaimer */}
        <Alert
          className="mb-5 d-flex align-items-center"
          style={{ backgroundColor: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.3)', color: '#fff' }}
        >
          <FaInfoCircle className="text-accent fs-4 me-3 flex-shrink-0" />
          <div>
            <strong>Disclaimer:</strong> All stocks and prices are subject to change without prior notice. Please contact us to verify the availability of a specific unit.
          </div>
        </Alert>

        <Row>
          {/* ── Sidebar Filters ── */}
          <Col lg={3} className="mb-4">
            <div style={sidebarStyle}>
              <h5 className="mb-4 d-flex align-items-center gap-2">
                <FaFilter className="text-accent" /> Filters
              </h5>

              {/* Search */}
              <div className="mb-4">
                <label className="text-secondary fw-bold d-block mb-2" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Search</label>
                <div className="d-flex align-items-center" style={{ ...inputStyle, padding: '8px 12px' }}>
                  <FaSearch className="text-secondary me-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Brand, model, type..."
                    value={filters.search}
                    onChange={(e) => setFilter('search', e.target.value)}
                    style={{ background: 'transparent', border: 'none', outline: 'none', color: 'white', width: '100%' }}
                  />
                  {filters.search && (
                    <FaTimes className="text-secondary ms-1 flex-shrink-0" style={{ cursor: 'pointer' }} onClick={() => setFilter('search', '')} />
                  )}
                </div>
              </div>

              {/* Brand */}
              <div className="mb-4">
                <label className="text-secondary fw-bold d-block mb-2" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Brand</label>
                <select value={filters.brand} onChange={(e) => setFilter('brand', e.target.value)} style={{ ...inputStyle, width: '100%', padding: '8px 12px' }}>
                  {brands.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              {/* Type */}
              <div className="mb-4">
                <label className="text-secondary fw-bold d-block mb-2" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Type</label>
                <select value={filters.type} onChange={(e) => setFilter('type', e.target.value)} style={{ ...inputStyle, width: '100%', padding: '8px 12px' }}>
                  {types.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-4">
                <label className="text-secondary fw-bold d-block mb-2" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Price Range (₱)
                </label>
                <div className="d-flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) => setFilter('priceMin', e.target.value)}
                    style={{ ...inputStyle, width: '50%', padding: '8px 10px' }}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => setFilter('priceMax', e.target.value)}
                    style={{ ...inputStyle, width: '50%', padding: '8px 10px' }}
                  />
                </div>
              </div>

              <button
                className="btn-accent w-100"
                onClick={clearAllFilters}
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', fontSize: '0.85rem' }}
              >
                Reset All Filters
              </button>
            </div>
          </Col>

          {/* ── Bike Grid ── */}
          <Col lg={9}>
            {/* Results count + active chips */}
            {!loading && (
              <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                <span className="text-secondary" style={{ fontSize: '0.9rem' }}>
                  Showing <strong className="text-white">{filteredBikes.length}</strong> of <strong className="text-white">{bikesData.length}</strong> bikes
                </span>
                {activeChips.map((chip) => (
                  <span
                    key={chip.key}
                    className="d-inline-flex align-items-center gap-1 px-3 py-1"
                    style={{ background: 'rgba(255,59,48,0.15)', border: '1px solid rgba(255,59,48,0.3)', borderRadius: '20px', fontSize: '0.8rem', color: '#fff', cursor: 'pointer' }}
                    onClick={() => setFilter(chip.key, chip.key === 'brand' || chip.key === 'type' ? 'All' : '')}
                  >
                    {chip.label} <FaTimes style={{ fontSize: '0.7rem', opacity: 0.7 }} />
                  </span>
                ))}
                {activeChips.length > 1 && (
                  <span
                    className="text-accent"
                    style={{ fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={clearAllFilters}
                  >
                    Clear all
                  </span>
                )}
              </div>
            )}

            <Row className="g-4">
              {loading ? (
                // Skeleton placeholders — 6 cards in a 3-col grid
                Array.from({ length: 6 }).map((_, i) => (
                  <Col xl={4} md={6} key={i}>
                    <SkeletonCard />
                  </Col>
                ))
              ) : filteredBikes.length > 0 ? (
                filteredBikes.map((bike) => (
                  <Col xl={4} md={6} key={bike._id}>
                    <div className="bike-card h-100">
                      <div className="bike-img-wrapper" style={{ height: '200px' }}>
                        <img src={getImageUrl(bike)} alt={bike.model} className="bike-img" />
                      </div>
                      <div className="bike-details p-3">
                        <span className="text-secondary mb-1 d-block" style={{ fontSize: '0.85rem' }}>{bike.brand} • {bike.type}</span>
                        <h4 className="bike-title" style={{ fontSize: '1.2rem' }}>{bike.model} {bike.edition}</h4>
                        <div className="bike-specs mb-3">
                          <span><FaCalendarAlt className="text-accent me-1" />{bike.year}</span>
                          <span><FaRoad className="text-accent me-1" />{withUnit(bike.mileage, 'km')}</span>
                        </div>
                        <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '10px 0' }} />
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="bike-price" style={{ fontSize: '1.3rem' }}>{withPeso(bike.price)}</span>
                          <Link 
                            to={`/bike/${bike._id}`} 
                            className="text-accent cta-link-hover" 
                            style={{ 
                              fontSize: '0.8rem', 
                              textDecoration: 'underline',
                              textUnderlineOffset: '3px',
                              fontWeight: '600'
                            }}
                          >
                            View Full Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))
              ) : (
                <Col>
                  <div className="text-center p-5 text-secondary">
                    <FaSearch style={{ fontSize: '2rem', marginBottom: '16px', opacity: 0.4 }} />
                    <h5>No bikes match your filters.</h5>
                    <p style={{ fontSize: '0.9rem' }}>Try adjusting your search or <span className="text-accent" style={{ cursor: 'pointer' }} onClick={clearAllFilters}>clearing all filters</span>.</p>
                  </div>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Inventory;
