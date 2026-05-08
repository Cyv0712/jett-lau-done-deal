import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaArrowLeft, FaCalendarAlt, FaRoad, FaExclamationTriangle, FaCheckCircle, FaCogs } from 'react-icons/fa';

const BikeDetails = () => {
  const { id } = useParams();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/bikes/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => { setBike(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [id]);

  const getImageUrl = (image) => image && image.startsWith('/uploads') ? `http://localhost:5000${image}` : image;

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

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
      <Container>
        <Link to="/inventory" className="text-secondary text-decoration-none mb-4 d-inline-block" style={{ transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
          <FaArrowLeft className="me-2" /> Back to Inventory
        </Link>
        
        <Row className="g-5">
          <Col lg={7}>
            <div className="position-sticky" style={{ top: '120px' }}>
              <img 
                src={getImageUrl(bike.image)} 
                alt={bike.model} 
                className="img-fluid rounded shadow-lg" 
                style={{ width: '100%', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.1)' }} 
              />
            </div>
          </Col>
          
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
                    <span className="fw-bold">{bike.mileage}</span>
                  </div>
                </div>
              </div>

              <h2 className="text-accent fw-bold mb-4" style={{ fontSize: '2.5rem' }}>{bike.price}</h2>
              
              <button className="btn-accent w-100 mb-4" style={{ fontSize: '1.2rem', padding: '15px' }}>
                Contact Seller
              </button>

              <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
              
              <div className="mt-4">
                <h5 className="text-white mb-3"><FaCheckCircle className="text-success me-2" /> Overview</h5>
                <p className="text-secondary" style={{ lineHeight: '1.8' }}>{bike.description}</p>
              </div>

              {/* Technical Specifications */}
              <div className="mt-4">
                <h5 className="text-white mb-3"><FaCogs className="text-accent me-2" /> Technical Specs</h5>
                <Row className="g-3">
                  <Col md={6}>
                    <div className="p-3 rounded" style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.02)' }}>
                      <small className="text-secondary d-block mb-1">Engine Size</small>
                      <span className="text-white fw-bold">{bike.engineSize}</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 rounded" style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.02)' }}>
                      <small className="text-secondary d-block mb-1">Engine Config</small>
                      <span className="text-white fw-bold">{bike.engineConfig}</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 rounded" style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.02)' }}>
                      <small className="text-secondary d-block mb-1">Max Power</small>
                      <span className="text-white fw-bold">{bike.power}</span>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="p-3 rounded" style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.02)' }}>
                      <small className="text-secondary d-block mb-1">Transmission</small>
                      <span className="text-white fw-bold">{bike.transmission}</span>
                    </div>
                  </Col>
                </Row>
              </div>

              <div className="mt-4 p-3 rounded" style={{ backgroundColor: 'rgba(255, 59, 48, 0.1)', border: '1px solid rgba(255, 59, 48, 0.3)' }}>
                <h5 className="text-accent mb-2 d-flex align-items-center gap-2">
                  <FaExclamationTriangle /> Honest Notes
                </h5>
                <p className="text-secondary mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                  {bike.issues}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BikeDetails;
