import { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { showcaseBikes } from '../data/showcase';
import { apiUrl } from '../config/api';
import Reveal from './Reveal';

const FeaturedBikes = () => {
  const [inventoryModels, setInventoryModels] = useState([]);

  useEffect(() => {
    // Fetch live inventory to check stock status
    fetch(apiUrl('/api/bikes'))
      .then(res => res.json())
      .then(data => {
        const inStockOnly = data.filter(bike => bike.status === 'Available' || !bike.status);
        // Create full identity strings (e.g. "Kawasaki Versys 650")
        const identitiesInStock = inStockOnly.map(bike => {
          const cleanCC = bike.engineSize?.replace('CC', '').trim() || '';
          return `${bike.brand} ${bike.model} ${cleanCC}`.toLowerCase().replace(/\s+/g, ' ').trim();
        });
        setInventoryModels(identitiesInStock);
      })
      .catch(err => console.error(err));
  }, []);

  const checkStock = (searchName) => {
    const target = searchName.toLowerCase().replace(/\s+/g, ' ').trim();
    return inventoryModels.includes(target);
  };

  return (
    <section id="inventory" className="section-padding">
      <Container>
        <div className="text-center mb-5">
           <Reveal>
             <span className="text-accent mb-2 d-block" style={{ fontSize: '0.85rem', letterSpacing: '4px', fontWeight: 600 }}>OUR SHOWROOM</span>
             <h2 className="moto-heading mb-0">
               FEATURED BIKES
             </h2>
           </Reveal>
        </div>
        <Row className="g-4">
          {showcaseBikes.map((bike, index) => {
            const inStock = checkStock(bike.searchModel);

            return (
              <Col lg={4} md={6} key={bike.slug}>
                <Reveal delay={(index % 3) + 1} className="h-100">
                  <div className="moto-card d-flex flex-column h-100">
                    <div className="position-absolute top-0 end-0 p-3" style={{ zIndex: 10 }}>
                      {inStock ? (
                        <Badge className="bg-success" style={{ fontSize: '0.75rem', padding: '6px 12px', fontWeight: 600 }}>AVAILABLE</Badge>
                      ) : (
                        <Badge className="bg-danger" style={{ fontSize: '0.75rem', padding: '6px 12px', fontWeight: 600 }}>SOLD OUT</Badge>
                      )}
                    </div>

                    <div className="bike-img-wrapper" style={{ height: '400px', overflow: 'hidden' }}>
                      <Carousel interval={null} slide={true} className="h-100">
                        {bike.images.map((imgSrc, idx) => (
                          <Carousel.Item key={idx} className="h-100">
                            <img
                              src={imgSrc}
                              alt={`${bike.model} angle ${idx + 1}`}
                              className="d-block w-100 h-100"
                              style={{ objectFit: 'cover', objectPosition: 'top' }}
                            />
                          </Carousel.Item>
                        ))}
                      </Carousel>
                    </div>

                    <div className="p-4 d-flex flex-column flex-grow-1">
                      <h3 className="moto-heading mb-3" style={{ fontSize: '1.4rem' }}>
                        <span className="text-accent">{bike.brand}</span> {bike.model}
                      </h3>
                      <p className="text-secondary mb-4 flex-grow-1" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                        {bike.description}
                      </p>
                      <div className="pt-3">
                        <Link 
                          to={`/showcase/${bike.slug}`} 
                          className="moto-btn moto-btn-outline w-100"
                        >
                          VIEW FULL DETAILS
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedBikes;
