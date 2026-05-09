import { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Carousel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { showcaseBikes } from '../data/showcase';

const FeaturedBikes = () => {
  const [inventoryModels, setInventoryModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch live inventory to check stock status
    fetch('http://localhost:5000/api/bikes')
      .then(res => res.json())
      .then(data => {
        const modelsInStock = data.map(bike => bike.model.toLowerCase());
        setInventoryModels(modelsInStock);
      })
      .catch(err => console.error(err));
  }, []);

  const checkStock = (searchModel) => {
    return inventoryModels.includes(searchModel.toLowerCase());
  };

  const handleCardClick = (e, slug) => {
    // If the user clicked on a carousel control or indicator, do NOT navigate
    if (e.target.closest('.carousel-control-prev') ||
      e.target.closest('.carousel-control-next') ||
      e.target.closest('.carousel-indicators')) {
      return;
    }
    navigate(`/showcase/${slug}`);
  };

  return (
    <section id="inventory" className="section-padding">
      <Container>
        <h2 className="section-title">
          FEATURED <span className="text-accent">BIKES</span>
        </h2>
        <Row className="g-4">
          {showcaseBikes.map((bike) => {
            const inStock = checkStock(bike.searchModel);

            return (
              <Col lg={4} md={6} key={bike.slug}>
                {/* We use a div instead of a Link wrapper to manually control routing without hijacking carousel clicks */}
                <div
                  className="bike-card position-relative"
                  style={{ cursor: 'pointer', height: '100%' }}
                  onClick={(e) => handleCardClick(e, bike.slug)}
                >
                  <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 2 }}>
                    {inStock ? (
                      <Badge bg="success" className="px-3 py-2 shadow" style={{ fontSize: '0.9rem' }}>In Stock</Badge>
                    ) : (
                      <Badge bg="danger" className="px-3 py-2 shadow" style={{ fontSize: '0.9rem' }}>Out of Stock</Badge>
                    )}
                  </div>

                  <div className="bike-img-wrapper" style={{ height: '250px' }}>
                    <Carousel interval={null} slide={true}>
                      {bike.images.map((imgSrc, idx) => (
                        <Carousel.Item key={idx}>
                          <img
                            src={imgSrc}
                            alt={`${bike.model} angle ${idx + 1}`}
                            className="d-block w-100"
                            style={{ height: '250px', objectFit: 'cover' }}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>

                  <div className="bike-details p-4">
                    <span className="text-secondary mb-1 d-block text-uppercase fw-bold" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>{bike.brand}</span>
                    <h3 className="bike-title mb-3">{bike.model}</h3>
                    <p className="text-secondary mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                      {bike.description}
                    </p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedBikes;
