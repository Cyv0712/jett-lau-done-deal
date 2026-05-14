import { Container, Row, Col } from 'react-bootstrap';
import { FaShieldAlt, FaCheckDouble, FaFileContract } from 'react-icons/fa';
import { brandConfig } from '../data/brandConfig';

const AboutUs = () => {
  return (
    <section id="about" className="section-padding about-section">
      <Container>
        <Row className="align-items-center mb-5">
          <Col lg={6}>
            <h2 className="section-title text-start mb-4">
              WHY CHOOSE <span className="text-accent">{brandConfig.name}</span>
            </h2>
            <p className="text-secondary lead mb-4">
              We don't just sell motorcycles; we deliver the promise of adventure. Every bigbike in our showroom is meticulously vetted to ensure you get nothing but the best.
            </p>
          </Col>
        </Row>
        <Row className="g-4">
          <Col md={4}>
            <div className="feature-box">
              <FaCheckDouble className="feature-icon" />
              <h4>100-Point Inspection</h4>
              <p className="text-secondary">Every adventure bike undergoes a rigorous mechanical and electrical check by certified mechanics.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-box">
              <FaShieldAlt className="feature-icon" />
              <h4>Verified History</h4>
              <p className="text-secondary">Complete transparency. All our bikes come with a clear history and guaranteed no major accident records.</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-box">
              <FaFileContract className="feature-icon" />
              <h4>Hassle-Free Papers</h4>
              <p className="text-secondary">We handle the complete transfer of ownership and documentation so you can focus on the ride.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutUs;
