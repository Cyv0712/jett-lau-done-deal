import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import { FaTag, FaRoad, FaCalendarAlt, FaFilter, FaInfoCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [bikesData, setBikesData] = useState([]);
  const [filterBrand, setFilterBrand] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/bikes')
      .then(res => res.json())
      .then(data => { setBikesData(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  // Simple frontend filter
  const filteredBikes = filterBrand === 'All' 
    ? bikesData 
    : bikesData.filter(b => b.brand === filterBrand);

  const brands = ['All', 'BMW', 'Honda', 'Ducati', 'Yamaha', 'Kawasaki', 'Triumph', 'KTM'];

  const getImageUrl = (image) => image && image.startsWith('/uploads') ? `http://localhost:5000${image}` : image;

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <Container>
        <div className="mb-5 text-center">
          <span className="hero-subtitle" style={{ fontSize: '1rem' }}>FULL INVENTORY</span>
          <h1 className="section-title mb-0">FIND YOUR <span className="text-accent">NEXT RIDE</span></h1>
        </div>
        
        <Alert variant="danger" className="mb-5 d-flex align-items-center" style={{ backgroundColor: 'rgba(255, 59, 48, 0.1)', border: '1px solid rgba(255, 59, 48, 0.3)', color: '#fff' }}>
          <FaInfoCircle className="text-accent fs-4 me-3" />
          <div>
            <strong>Disclaimer:</strong> All stocks and prices are subject to change without prior notice. Please contact us to verify the availability of a specific unit.
          </div>
        </Alert>

        <Row>
          {/* Sidebar Filters */}
          <Col lg={3} className="mb-4">
            <div className="p-4" style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h4 className="mb-4 d-flex align-items-center gap-2"><FaFilter className="text-accent" /> Filters</h4>
              
              <Form.Group className="mb-4">
                <Form.Label className="text-secondary fw-bold">Brand</Form.Label>
                <Form.Select 
                  value={filterBrand} 
                  onChange={(e) => setFilterBrand(e.target.value)}
                  style={{ backgroundColor: '#0a0a0a', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <button className="btn-accent w-100" onClick={() => setFilterBrand('All')}>Reset Filters</button>
            </div>
          </Col>

          {/* Bike Grid */}
          <Col lg={9}>
            {loading ? (
              <h4 className="text-white text-center mt-5">Loading inventory...</h4>
            ) : (
              <Row className="g-4">
                {filteredBikes.map((bike) => (
                  <Col xl={4} md={6} key={bike._id}>
                    <Link to={`/bike/${bike._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                      <div className="bike-card h-100">
                        <div className="bike-img-wrapper" style={{ height: '200px' }}>
                          <img src={getImageUrl(bike.image)} alt={bike.model} className="bike-img" />
                        </div>
                        <div className="bike-details p-3">
                          <span className="text-secondary mb-1 d-block" style={{ fontSize: '0.85rem' }}>{bike.brand} • {bike.type}</span>
                          <h4 className="bike-title" style={{ fontSize: '1.2rem' }}>{bike.model}</h4>
                          <div className="bike-specs mb-3">
                            <span><FaCalendarAlt className="text-accent me-1" />{bike.year}</span>
                            <span><FaRoad className="text-accent me-1" />{bike.mileage}</span>
                          </div>
                          <hr style={{ borderColor: 'rgba(255,255,255,0.1)', margin: '10px 0' }} />
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="bike-price" style={{ fontSize: '1.4rem' }}>{bike.price}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Col>
                ))}
                {filteredBikes.length === 0 && (
                  <Col>
                    <div className="text-center p-5 text-secondary">
                      <h5>No bikes found matching your criteria.</h5>
                    </div>
                  </Col>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Inventory;
