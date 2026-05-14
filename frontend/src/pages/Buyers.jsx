import { Container, Row, Col } from 'react-bootstrap';
import { FaQuoteLeft } from 'react-icons/fa';
import { buyersData } from '../data/buyers';

const Buyers = () => {
  return (
    <div className="buyers-page pb-5">
      {/* ── 1. Hero Section ── */}
      <section 
        className="buyers-hero position-relative d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: '40vh',
          marginTop: '76px', // Offset for navbar
          backgroundColor: '#0b0b0f'
        }}
      >
        <Container>
          <span className="hero-subtitle mb-3 text-accent" style={{ letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700' }}>
            MGA KA-DEAL NATIN
          </span>
          <h1 className="hero-title fw-bold mb-4" style={{ fontSize: '3.5rem' }}>
            THE <span className="text-accent">DONE DEAL</span> COMMUNITY
          </h1>
          <p className="lead text-secondary mx-auto" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
            Don't just take our word for it. Read the stories of riders from all over the Philippines who found their dream bikes with us.
          </p>
        </Container>
      </section>

      {/* ── 2. Testimonial Grid ── */}
      <section className="section-padding py-5">
        <Container>
          <Row className="g-4">
            {buyersData.map((buyer) => (
              <Col lg={6} key={buyer.id}>
                <div className="buyer-card h-100 d-flex flex-column" style={{
                  backgroundColor: 'var(--bg-card)',
                  borderRadius: '12px',
                  border: '1px solid var(--border-subtle)',
                  overflow: 'hidden'
                }}>
                  <div className="row g-0 flex-grow-1">
                    <div className="col-md-5">
                      <img 
                        src={buyer.image} 
                        alt={buyer.name} 
                        className="img-fluid h-100" 
                        style={{ objectFit: 'cover', minHeight: '250px', width: '100%' }} 
                      />
                    </div>
                    <div className="col-md-7 d-flex flex-column p-4">
                      <FaQuoteLeft className="text-accent mb-3 fs-4" style={{ opacity: 0.5 }} />
                      <p className="text-secondary fst-italic flex-grow-1">"{buyer.quote}"</p>
                      
                      <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <h5 className="mb-1 text-white">{buyer.name}</h5>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="text-secondary" style={{ fontSize: '0.85rem' }}>{buyer.location}</span>
                          <div className="text-end">
                            <span className="text-accent fw-bold d-block" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>PURCHASED</span>
                            <span className="text-white" style={{ fontSize: '0.9rem' }}>{buyer.bike}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Buyers;
