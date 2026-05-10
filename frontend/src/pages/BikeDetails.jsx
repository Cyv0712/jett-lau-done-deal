import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Carousel } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaRoad, FaExclamationTriangle, FaCheckCircle, FaCogs, FaCircle } from 'react-icons/fa';
import { apiUrl, toAbsoluteUploadUrl } from '../config/api';

const BikeDetails = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl(`/api/bikes/${id}`))
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => { setBike(data); setLoading(false); })
      .catch((err) => { console.error(err); setLoading(false); });
  }, [id]);

  const getImageUrl = (path) => toAbsoluteUploadUrl(path);

  // Append a unit suffix only if the value doesn't already contain it
  const withUnit = (value, suffix) => {
    if (!value) return '—';
    const str = String(value).trim();
    if (str.toLowerCase().endsWith(suffix.toLowerCase())) return str;
    return `${str} ${suffix}`;
  };

  // Prefix ₱ only if the value doesn't already start with it
  const withPeso = (value) => {
    if (!value) return '—';
    const str = String(value).trim();
    return str.startsWith('₱') ? str : `₱${str}`;
  };

  // Normalise to an array — supports both old (string) and new (array) schema
  const getImages = (bike) => {
    if (Array.isArray(bike.images) && bike.images.length > 0) return bike.images;
    if (bike.image) return [bike.image]; // backwards compat with old single-image field
    return [];
  };

  // Convert newline-separated issues text into a bullet list
  const renderIssues = (text) => {
    if (!text) return <p className="text-secondary mb-0">None reported.</p>;
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length <= 1) {
      return <p className="text-secondary mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{text}</p>;
    }
    return (
      <ul className="mb-0 ps-0" style={{ listStyle: 'none' }}>
        {lines.map((line, i) => (
          <li key={i} className="text-secondary d-flex align-items-start gap-2 mb-2" style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
            <FaCircle style={{ fontSize: '0.4rem', marginTop: '7px', color: 'var(--accent-color)', flexShrink: 0 }} />
            {line}
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <div style={{ paddingTop: '150px', minHeight: '100vh', textAlign: 'center' }}><h2 className="text-white">Loading...</h2></div>;
  }

  if (!bike) {
    return (
      <div style={{ paddingTop: '150px', minHeight: '100vh', textAlign: 'center' }}>
        <h2 className="text-white">Bike not found</h2>
        <Link to="/inventory" className="btn-accent mt-4 d-inline-block text-decoration-none">Back to Inventory</Link>
      </div>
    );
  }

  const images = getImages(bike);

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <Container>
        <Link
          to="/inventory"
          className="text-secondary text-decoration-none mb-4 d-inline-block"
          style={{ transition: 'color 0.3s' }}
          onMouseOver={(e) => (e.target.style.color = '#fff')}
          onMouseOut={(e) => (e.target.style.color = 'var(--text-secondary)')}
        >
          <FaArrowLeft className="me-2" /> Back to Inventory
        </Link>

        <Row className="g-5">
          {/* ── Image Carousel ── */}
          <Col lg={7}>
            <div className="position-sticky" style={{ top: '120px' }}>
              {images.length > 1 ? (
                <Carousel
                  interval={null}
                  style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        src={getImageUrl(img)}
                        alt={`${bike.model} — photo ${idx + 1}`}
                        className="d-block w-100"
                        style={{ height: '600px', objectFit: 'cover' }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : (
                <img
                  src={getImageUrl(images[0])}
                  alt={bike.model}
                  className="img-fluid rounded shadow-lg"
                  style={{ width: '100%', height: '600px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              )}
            </div>
          </Col>

          {/* ── Bike Info ── */}
          <Col lg={5}>
            <div className="p-4" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <span className="text-secondary">{bike.brand} • {bike.type}</span>
                <Badge bg="success">Available</Badge>
              </div>
              <h1 className="bike-title mb-4" style={{ fontSize: '2.5rem' }}>{bike.model}</h1>

              <div className="d-flex gap-4 mb-4 text-white">
                <div className="d-flex align-items-center gap-2">
                  <FaCalendarAlt className="text-accent fs-4" />
                  <div>
                    <small className="text-secondary d-block">Year</small>
                    <span className="fw-bold">{bike.year}</span>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaRoad className="text-accent fs-4" />
                  <div>
                    <small className="text-secondary d-block">Mileage</small>
                    <span className="fw-bold">{withUnit(bike.mileage, 'km')}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-accent fw-bold mb-4" style={{ fontSize: '2.5rem' }}>{withPeso(bike.price)}</h2>

              <button className="btn-accent w-100 mb-4" style={{ fontSize: '1.2rem', padding: '15px' }}>
                Contact Seller
              </button>

              <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />

              {/* Overview */}
              <div className="mt-4">
                <h5 className="text-white mb-3"><FaCheckCircle className="text-success me-2" /> Overview</h5>
                <p className="text-secondary" style={{ lineHeight: '1.8' }}>{bike.description}</p>
              </div>

              {/* Technical Specs */}
              <div className="mt-4">
                <h5 className="text-white mb-3"><FaCogs className="text-accent me-2" /> Technical Specs</h5>
                <Row className="g-3">
                  {[
                    { label: 'Engine Size',   value: bike.engineSize },
                    { label: 'Engine Config',  value: bike.engineConfig },
                    { label: 'Max Power',      value: withUnit(bike.power, 'HP') },
                    { label: 'Transmission',   value: bike.transmission },
                    { label: 'Fuel Capacity',  value: withUnit(bike.fuelCapacity, 'L') },
                  ].map(({ label, value }) => (
                    <Col md={6} key={label}>
                      <div className="p-3 rounded" style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.02)' }}>
                        <small className="text-secondary d-block mb-1">{label}</small>
                        <span className="text-white fw-bold">{value || '—'}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>

              {/* Honest Notes — issues rendered as bullet list */}
              <div className="mt-4 p-3 rounded" style={{ backgroundColor: 'rgba(255,59,48,0.1)', border: '1px solid rgba(255,59,48,0.3)' }}>
                <h5 className="text-accent mb-3 d-flex align-items-center gap-2">
                  <FaExclamationTriangle /> Honest Notes
                </h5>
                {renderIssues(bike.issues)}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BikeDetails;
