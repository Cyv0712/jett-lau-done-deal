import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <Container>
        <Row>
          <Col lg={8}>
            <span className="hero-subtitle">Premium Second-Hand Bigbikes</span>
            <h1 className="hero-title">
              CONQUER EVERY <br />
              <span className="text-accent">ADVENTURE</span>
            </h1>
            <p className="lead mb-5 text-secondary" style={{ maxWidth: '600px' }}>
              The Philippines' most trusted dealer for premium second-hand adventure and touring motorcycles. Fully inspected, ready to ride.
            </p>
            <div className="d-flex gap-3">
              <button className="btn-accent d-flex align-items-center gap-2">
                View Inventory <FaArrowRight />
              </button>
              <button className="btn-accent" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)' }}>
                Contact Us
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
