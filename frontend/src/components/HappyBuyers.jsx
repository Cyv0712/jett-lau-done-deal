import { Container, Row, Col } from 'react-bootstrap';
import { FaQuoteLeft } from 'react-icons/fa';

const HappyBuyers = () => {
  const buyers = [
    {
      id: 1,
      name: 'Kuya Ben',
      location: 'Marikina City',
      bike: 'Honda Africa Twin',
      quote: 'Sobrang daling kausap ni sir Jett! The bike was exactly as described, no hidden issues. Ready for our next long ride up North. Salamat sa tiwala!',
      image: 'https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Mark & Sarah',
      location: 'Cebu City (Shipped)',
      bike: 'BMW R 1250 GS',
      quote: 'Kahit nasa Cebu kami, smooth ang transaction at shipping. Very professional and transparent with the papers. Maraming salamat Jett Lau Done Deal!',
      image: 'https://images.unsplash.com/photo-1558980664-ce6960be307d?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Boss Rico',
      location: 'Quezon City',
      bike: 'Ducati Multistrada',
      quote: 'I\'ve bought multiple bikes from them. Laging quality at alagang-alaga ang mga units. The best premium bigbike dealer sa buong Metro Manila!',
      image: 'https://images.unsplash.com/photo-1623863456382-9cb77da96df6?q=80&w=500&auto=format&fit=crop'
    }
  ];

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
          {buyers.map((buyer) => (
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
      </Container>
    </section>
  );
};

export default HappyBuyers;
