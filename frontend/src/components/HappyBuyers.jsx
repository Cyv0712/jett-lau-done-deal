import { Container, Row, Col } from 'react-bootstrap';
import { FaQuoteLeft } from 'react-icons/fa';

import { buyersData } from '../data/buyers';

const HappyBuyers = () => {
  // Only show the first 3 buyers on the landing page
  const featuredBuyers = buyersData.slice(0, 3);

  return (
    <section id="buyers" className="section-padding" style={{ backgroundColor: '#0a0a0a' }}>
      <Container>
        <div className="text-center mb-5">
          <span className="hero-subtitle" style={{ fontSize: '1rem' }}>MGA KA-DEAL NATIN</span>
          <h2 className="section-title mb-0">
            OUR HAPPY <span className="text-accent">RIDERS</span>
          </h2>
          <p className="text-secondary mt-3">Salamat sa tiwala! Join our growing community of premium bigbike owners across the Philippines.</p>
        </div>
        <Row className="g-4">
          {featuredBuyers.map((buyer) => (
            <Col lg={4} key={buyer.id}>
              <div className="buyer-card h-100">
                <div className="buyer-img-wrapper">
                  <img src={buyer.image} alt={buyer.name} className="buyer-img" />
                </div>
                <div className="buyer-content">
                  <FaQuoteLeft className="text-accent mb-3 fs-3" style={{ opacity: 0.5 }} />
                  <p className="text-secondary fst-italic mb-4">"{buyer.quote}"</p>
                  <hr style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <h5 className="mb-0 text-white">{buyer.name}</h5>
                      <span className="text-secondary" style={{ fontSize: '0.85rem' }}>{buyer.location}</span>
                    </div>
                    <div className="text-end">
                      <span className="text-accent fw-bold d-block" style={{ fontSize: '0.85rem' }}>BOUGHT</span>
                      <span className="text-white" style={{ fontSize: '0.85rem' }}>{buyer.bike}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-5">
          <a href="/buyers" className="btn-accent text-decoration-none">
            View All Testimonials
          </a>
        </div>
      </Container>
    </section>
  );
};

export default HappyBuyers;
