import { Container, Row, Col } from 'react-bootstrap';
import { Mail } from 'lucide-react';
import { FaFacebookF, FaViber } from 'react-icons/fa';
import { contactInfo } from '../data/contactInfo';
import Reveal from '../components/Reveal';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const cleanNumber = contactInfo.viber.replace(/^0/, '63');
  const viberLink = isMobile
    ? `viber://chat/?number=%2B${cleanNumber}&draft=$hello`
    : `viber://chat/?number=+${cleanNumber}&draft=$hello`;
  const emailLink = isMobile
    ? `mailto:${contactInfo.email}`
    : `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email}`;

  const handleViberClick = (e) => {
    e.preventDefault();
    // Open a new tab in about:blank state first
    const newTab = window.open('about:blank', '_blank');
    if (!newTab) return;

    // Direct the new tab to the deep link scheme
    newTab.location.href = viberLink;

    // Timeout check: if the tab is still on about:blank after 2 seconds, Viber isn't installed.
    // Redirect the user to the official download page instead.
    setTimeout(() => {
      try {
        if (!newTab.closed) {
          if (newTab.location.href === 'about:blank' || newTab.location.href.startsWith('viber://')) {
            newTab.location.href = 'https://www.viber.com/en/download/';
          }
        }
      } catch {
        // Safe to ignore: a cross-origin error means it successfully navigated or launched
      }
    }, 2000);
  };

  return (
    <div className="contact-page pb-5" style={{ backgroundColor: 'var(--bg-void)', minHeight: '100vh', paddingTop: '76px' }}>
      <Helmet>
        <title>Contact Us | Jett Lau Done Deal</title>
        <meta name="description" content="Connect with Jett Lau Done Deal. Reach out directly via Viber, Facebook Messenger, or Email for big bike availability and financing inquiries." />
        <meta property="og:title" content="Contact Us | Jett Lau Done Deal" />
        <meta property="og:description" content="Reach out to us directly via Viber, Facebook Messenger, or Email." />
        <meta property="og:image" content="https://jettlaudonedeal.com/static_data/favicon_jett_lau.png" />
        <meta property="og:url" content="https://jettlaudonedeal.com/contact" />
      </Helmet>
      {/* ── 1. Hero Section ── */}
      <section
        className="contact-hero position-relative d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: '25vh'
        }}
      >
        <Container>
          <Reveal>
            <span className="text-accent mb-2 d-block" style={{ letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700', fontSize: '0.85rem' }}>
              GET IN TOUCH
            </span>
            <h1 className="moto-heading mb-0" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)' }}>CONNECT WITH US</h1>
          </Reveal>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="moto-heading mb-3" style={{ fontSize: '1.5rem' }}>DIRECT CHANNELS</h2>
              <p className="text-secondary" style={{ fontSize: '1rem' }}>
                Operational transparency is our priority. Reach out to us directly for immediate inquiries.
              </p>
            </Col>
          </Row>

          <Row className="g-4 justify-content-center mb-5">
            <Col md={4}>
              <Reveal delay={1} className="h-100">
                <a
                  href={viberLink}
                  onClick={handleViberClick}
                  target="_blank"
                  rel="noreferrer"
                  className="moto-card p-4 text-center text-decoration-none d-block h-100"
                >
                  <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-muted rounded-circle" style={{ color: '#7360F2', width: '60px', height: '60px' }}>
                    <FaViber size={32} />
                  </div>
                  <h4 className="moto-heading mb-2" style={{ fontSize: '1.2rem' }}>VIBER</h4>
                  <p className="text-secondary mb-4">{contactInfo.viber}</p>
                  <div className="text-accent small fw-bold mt-auto">SEND A MESSAGE</div>
                </a>
              </Reveal>
            </Col>

            <Col md={4}>
              <Reveal delay={2} className="h-100">
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="moto-card p-4 text-center text-decoration-none d-block h-100"
                >
                  <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-muted rounded-circle" style={{ color: '#0084FF', width: '60px', height: '60px' }}>
                    <FaFacebookF size={30} />
                  </div>
                  <h4 className="moto-heading mb-2" style={{ fontSize: '1.2rem' }}>MESSENGER</h4>
                  <p className="text-secondary mb-4">Jett Lau Done Deal</p>
                  <div className="text-accent small fw-bold mt-auto">CHAT WITH US</div>
                </a>
              </Reveal>
            </Col>

            <Col md={4}>
              <Reveal delay={3} className="h-100">
                <a
                  href={emailLink}
                  target={isMobile ? undefined : "_blank"}
                  rel={isMobile ? undefined : "noreferrer"}
                  className="moto-card p-4 text-center text-decoration-none d-block h-100"
                >
                  <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-muted rounded-circle" style={{ color: 'var(--accent-primary)', width: '60px', height: '60px' }}>
                    <Mail size={30} />
                  </div>
                  <h4 className="moto-heading mb-2" style={{ fontSize: '1.2rem' }}>EMAIL US</h4>
                  <p className="text-secondary mb-4">{contactInfo.email}</p>
                  <div className="text-accent small fw-bold mt-auto" style={{ fontSize: '0.7rem' }}>FOR FINANCING REQUIREMENTS ONLY</div>
                </a>
              </Reveal>
            </Col>
          </Row>

          {/* ── 3. Showroom Map Section ── */}
          <Reveal delay={4}>
            <div className="moto-card p-4 p-md-5 mt-5">
              <Row className="g-4 align-items-center">
                <Col lg={5}>
                  <h3 className="moto-heading mb-4" style={{ fontSize: '2rem' }}>OUR LOCATION</h3>
                  <div className="mb-4">
                    <h5 className="text-primary mb-2" style={{ fontSize: '1rem', fontWeight: 600 }}>ADDRESS</h5>
                    <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.9 }}>
                      {contactInfo.address}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h5 className="text-primary mb-2" style={{ fontSize: '1rem', fontWeight: 600 }}>OPERATING HOURS</h5>
                    <p className="text-secondary" style={{ fontSize: '0.95rem', lineHeight: '1.6', opacity: 0.9 }}>
                      {contactInfo.operatingHours}
                    </p>
                  </div>
                  <div className="mt-4 pt-2">
                    <a
                      href={contactInfo.googleMaps}
                      target="_blank"
                      rel="noreferrer"
                      className="moto-btn d-inline-block text-decoration-none"
                      style={{ padding: '12px 24px', fontSize: '0.85rem' }}
                    >
                      OPEN IN GOOGLE MAPS
                    </a>
                  </div>
                </Col>
                <Col lg={7}>
                  <div
                    className="overflow-hidden rounded position-relative"
                    style={{
                      height: '400px',
                      border: '1px solid var(--border-color)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
                    }}
                  >
                    <iframe
                      title="Done Deal by Jett Lau Showroom Map"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.083377747864!2d121.0597107!3d14.6728488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7d66dced6ff%3A0x74a75f5b6bf8d21f!2sDone%20Deal%20by%20Jett%20Lau!5e0!3m2!1sen!2sph!4v1700000000000"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </Col>
              </Row>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
};

export default Contact;
