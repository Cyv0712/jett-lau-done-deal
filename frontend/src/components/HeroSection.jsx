import { Container, Row, Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import { brandConfig } from '../data/brandConfig';
import Reveal from './Reveal';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(11,11,15,0.92) 0%, rgba(11,11,15,0.55) 100%), url('${brandConfig.images.heroBackground}')`
      }}
    >
      <Container>
        <Row>
          <Col lg={8}>
            <Reveal>
              <span className="hero-subtitle">{brandConfig.description.split(' ')[0]} {brandConfig.description.split(' ')[1]} {brandConfig.description.split(' ')[2]}</span>
              <h1 className="hero-title">
                CONQUER EVERY <br />
                <span className="text-accent">ADVENTURE</span>
              </h1>
              <p className="lead mb-5 text-secondary" style={{ maxWidth: '600px' }}>
                {brandConfig.aboutHeroDescription}
              </p>
              <div className="d-flex gap-3">
                <button className="btn-accent d-flex align-items-center gap-2">
                  View Inventory <FaArrowRight />
                </button>
                <button className="btn-accent" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)' }}>
                  Contact Us
                </button>
              </div>
            </Reveal>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
