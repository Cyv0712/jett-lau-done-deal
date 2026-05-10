import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Carousel } from 'react-bootstrap';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { showcaseBikes } from '../data/showcase';
import { apiUrl } from '../config/api';

const ShowcaseDetails = () => {
  const { slug } = useParams();
  const bike = showcaseBikes.find(b => b.slug === slug);
  const [inStock, setInStock] = useState(false);
  const [inventoryId, setInventoryId] = useState(null);

  useEffect(() => {
    if (bike) {
      fetch(apiUrl('/api/bikes'))
        .then(res => res.json())
        .then(data => {
          const matchedBike = data.find(b => b.model.toLowerCase() === bike.searchModel.toLowerCase());
          if (matchedBike) {
            setInStock(true);
            setInventoryId(matchedBike._id);
          }
        })
        .catch(err => console.error(err));
    }
  }, [bike]);

  if (!bike) {
    return (
      <div style={{ paddingTop: '150px', minHeight: '100vh', textAlign: 'center' }}>
        <h2 className="text-white">Showcase Bike not found</h2>
        <Link to="/" className="btn-accent mt-4 d-inline-block text-decoration-none">Back to Home</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh', backgroundColor: '#0a0a0a' }}>
      <Container>
        <Link to="/" className="text-secondary text-decoration-none mb-4 d-inline-block" style={{ transition: 'color 0.3s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = 'var(--text-secondary)'}>
          <FaArrowLeft className="me-2" /> Back to Home
        </Link>
        
        <Row className="g-5 align-items-center">
          <Col lg={6}>
            <div className="position-relative">
              <div className="position-absolute top-0 start-0 p-3" style={{ zIndex: 2 }}>
                {inStock ? (
                  <Badge bg="success" className="px-3 py-2 shadow" style={{ fontSize: '1rem' }}>Currently In Stock</Badge>
                ) : (
                  <Badge bg="danger" className="px-3 py-2 shadow" style={{ fontSize: '1rem' }}>Out of Stock</Badge>
                )}
              </div>
              
              <Carousel interval={null} className="shadow-lg rounded" style={{ overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                {bike.images.map((imgSrc, idx) => (
                  <Carousel.Item key={idx}>
                    <img 
                      src={imgSrc} 
                      alt={`${bike.model} detail ${idx + 1}`} 
                      className="d-block w-100" 
                      style={{ height: '600px', objectFit: 'cover' }} 
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            </div>
          </Col>
          
          <Col lg={6}>
            <div>
              <span className="text-accent text-uppercase fw-bold mb-2 d-block" style={{ letterSpacing: '2px' }}>{bike.brand} Hall of Fame</span>
              <h1 className="text-white mb-3" style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1' }}>{bike.model}</h1>
              <h4 className="text-secondary mb-4 fst-italic">"{bike.tagline}"</h4>
              
              <p className="text-white mb-5" style={{ fontSize: '1.1rem', lineHeight: '1.8', opacity: '0.9' }}>
                {bike.description}
              </p>

              <div className="mb-5 p-4 rounded" style={{ backgroundColor: '#121212', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h5 className="text-white mb-4">Key Features</h5>
                <Row className="g-3">
                  {bike.features.map((feature, idx) => (
                    <Col sm={6} key={idx}>
                      <div className="d-flex align-items-center text-secondary">
                        <FaCheck className="text-accent me-2" />
                        <span>{feature}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
              
              {inStock ? (
                <div className="p-4 rounded border border-success" style={{ backgroundColor: 'rgba(25, 135, 84, 0.05)' }}>
                  <h5 className="text-white mb-2">Great news! We have one available.</h5>
                  <p className="text-secondary mb-4">Click below to view the actual second-hand unit we currently have in our inventory, including its cash price and specific condition details.</p>
                  <Link to={`/bike/${inventoryId}`} className="btn-accent text-decoration-none d-block text-center py-3" style={{ fontSize: '1.2rem' }}>
                    View Inventory Unit
                  </Link>
                </div>
              ) : (
                <div className="p-4 rounded border border-secondary" style={{ backgroundColor: '#121212' }}>
                  <h5 className="text-white mb-2">Currently Out of Stock</h5>
                  <p className="text-secondary mb-0">We don't have any second-hand {bike.model} units right now. Check back later or browse our other inventory!</p>
                  <Link to="/inventory" className="btn btn-outline-light w-100 mt-4 py-3" style={{ fontSize: '1.1rem' }}>
                    Browse All Inventory
                  </Link>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShowcaseDetails;
