import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaTag, FaRoad, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeaturedBikes = () => {
  const [bikesData, setBikesData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/bikes')
      .then(res => res.json())
      .then(data => setBikesData(data))
      .catch(err => console.error(err));
  }, []);

  const featured = bikesData.slice(0, 3); // Grab the first 3 for the homepage
  const getImageUrl = (image) => image && image.startsWith('/uploads') ? `http://localhost:5000${image}` : image;

  return (
    <section id="inventory" className="section-padding">
      <Container>
        <h2 className="section-title">
          FEATURED <span className="text-accent">ADVENTURE BIKES</span>
        </h2>
        <Row className="g-4">
          {featured.map((bike) => (
            <Col lg={4} md={6} key={bike._id}>
              <Link to={`/bike/${bike._id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
                <div className="bike-card">
                  <div className="bike-img-wrapper">
                    <img src={getImageUrl(bike.image)} alt={bike.model} className="bike-img" />
                  </div>
                  <div className="bike-details">
                    <span className="text-secondary mb-2 d-block">{bike.brand}</span>
                    <h3 className="bike-title">{bike.model}</h3>
                    <div className="bike-specs">
                      <span><FaCalendarAlt className="text-accent me-2" />{bike.year}</span>
                      <span><FaRoad className="text-accent me-2" />{bike.mileage}</span>
                    </div>
                    <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-secondary d-block" style={{ fontSize: '0.8rem' }}><FaTag className="me-1"/> Cash Price</span>
                        <p className="bike-price">{bike.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-5">
          <Link to="/inventory" className="btn-accent text-decoration-none d-inline-block">View All Inventory</Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedBikes;
