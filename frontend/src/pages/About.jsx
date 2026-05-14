import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaMotorcycle, FaWrench, FaHelmetSafety, FaHandshake } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { brandConfig } from '../data/brandConfig';

const About = () => {
  return (
    <div className="about-page pb-5">
      {/* ── 1. Hero Section ── */}
      <section
        className="about-hero position-relative d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: '90vh',
          marginTop: '76px', // Offset for navbar
          backgroundImage: `linear-gradient(to bottom, rgba(11,11,15,0.7), rgba(11,11,15,1)), url('${brandConfig.images.aboutHeroBackground}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <Container>
          <span className="hero-subtitle mb-3 text-accent" style={{ letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700' }}>
            {brandConfig.aboutHeroSubtitle}
          </span>
          <h1 className="hero-title fw-bold mb-4" style={{ fontSize: '4rem', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>
            {brandConfig.aboutHeroTitle} <span className="text-accent">{brandConfig.brandSuffix}</span>
          </h1>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: '700px', fontSize: '1.2rem' }}>
            {brandConfig.aboutHeroDescription}
          </p>
        </Container>
      </section>

      {/* ── 2. The Narrative ── */}
      <section className="section-padding py-5 mt-5">
        <Container>
          <Row className="align-items-center gy-5">
            <Col lg={6}>
              <div className="pe-lg-5">
                <h2 className="section-title text-start mb-4">
                  {brandConfig.storyTitle.split(' ')[0]} <span className="text-accent">{brandConfig.storyTitle.split(' ')[1]}</span>
                </h2>
                {brandConfig.storyParagraphs.map((para, idx) => (
                  <p key={idx} className="text-secondary mb-4" style={{ lineHeight: '1.8', fontSize: '1.1rem' }}>
                    {para}
                  </p>
                ))}
                <div className="d-flex align-items-center gap-3 mt-4 p-3 rounded" style={{ backgroundColor: 'rgba(249, 115, 22, 0.05)', borderLeft: '4px solid var(--accent-color)' }}>
                  <FaHandshake className="text-accent fs-2" />
                  <p className="mb-0 fst-italic text-white">"{brandConfig.quote}"</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <img
                src={brandConfig.images.storyImage}
                alt={brandConfig.name}
                className="img-fluid rounded shadow-lg w-100"
                style={{ objectFit: 'cover', objectPosition: 'top', height: '550px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── 3. The Philosophy ── */}
      <section className="section-padding py-5" style={{ backgroundColor: 'var(--bg-card)' }}>
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col md={8}>
              <h2 className="section-title mb-4">
                {brandConfig.philosophyTitle.split(' ')[0]} {brandConfig.philosophyTitle.split(' ')[1]} <span className="text-accent">{brandConfig.philosophyTitle.split(' ').slice(2).join(' ')}</span>
              </h2>
              <p className="text-secondary" style={{ fontSize: '1.1rem' }}>
                {brandConfig.philosophyDescription}
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <div className="text-center p-4 h-100 rounded" style={{ border: '1px solid var(--border-subtle)' }}>
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <FaMotorcycle className="text-accent fs-1" />
                </div>
                <h4 className="mb-3 text-white">Curated Selection</h4>
                <p className="text-secondary mb-0">We hand-pick only the finest pre-owned adventure and touring units. If it's not good enough for us to ride, it's not going on the showroom floor.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4 h-100 rounded" style={{ border: '1px solid var(--border-subtle)' }}>
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <FaWrench className="text-accent fs-1" />
                </div>
                <h4 className="mb-3 text-white">Thorough Vetting</h4>
                <p className="text-secondary mb-0">Every unit is carefully evaluated before it reaches our showroom. We ensure that what you see is exactly what you get, with zero hidden surprises.</p>
              </div>
            </Col>
            <Col md={4}>
              <div className="text-center p-4 h-100 rounded" style={{ border: '1px solid var(--border-subtle)' }}>
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: '80px', height: '80px', backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <FaHandshake className="text-accent fs-1" />
                </div>
                <h4 className="mb-3 text-white">Seamless Process</h4>
                <p className="text-secondary mb-0">We handle the heavy lifting. From documentation to transparent pricing, we make acquiring your dream bike as smooth as the ride itself.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── 4. The Done Deal Experience (Image Grid) ── */}
      <section className="section-padding py-5 mt-4">
        <Container>
          <Row className="mb-4">
            <Col>
              <h2 className="section-title text-start mb-0">
                THE <span className="text-accent">{brandConfig.brandSuffix}</span> EXPERIENCE
              </h2>
            </Col>
          </Row>
          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card className="bg-transparent border-0 overflow-hidden h-100" style={{ borderRadius: '12px' }}>
                <Card.Img variant="top" src={brandConfig.images.experienceCard1} style={{ height: '250px', objectFit: 'cover' }} />
                <Card.Body className="p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderTop: 'none', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                  <Card.Title className="text-white fw-bold mb-2">Premium Units</Card.Title>
                  <Card.Text className="text-secondary">Explore our showroom featuring meticulously detailed big bikes ready for their next owner.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={4}>
              <Card className="bg-transparent border-0 overflow-hidden h-100" style={{ borderRadius: '12px' }}>
                <Card.Img variant="top" src={brandConfig.images.experienceCard2} style={{ height: '250px', objectFit: 'cover' }} />
                <Card.Body className="p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderTop: 'none', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                  <Card.Title className="text-white fw-bold mb-2">Honest Notes</Card.Title>
                  <Card.Text className="text-secondary">Complete transparency. We provide a full breakdown of every unit's condition so you can buy with confidence.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={12} lg={4}>
              <Card className="bg-transparent border-0 overflow-hidden h-100" style={{ borderRadius: '12px' }}>
                <Card.Img variant="top" src={brandConfig.images.experienceCard3} style={{ height: '250px', objectFit: 'cover' }} />
                <Card.Body className="p-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderTop: 'none', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                  <Card.Title className="text-white fw-bold mb-2">The Community</Card.Title>
                  <Card.Text className="text-secondary">More than a showroom. We are a hub for riders who share a passion for the open road and the motorcycle lifestyle.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── 5. Call to Action ── */}
      <section className="mt-5 py-5 text-center" style={{ borderTop: '1px solid var(--border-subtle)' }}>
        <Container>
          <h3 className="mb-4 text-white">Ready to join the Ka-Deal community?</h3>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/inventory" className="btn-accent text-decoration-none">
              View Current Inventory
            </Link>
            <a href="/#contact" className="btn-accent text-decoration-none" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.4)', color: 'white' }}>
              Contact Us
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default About;
