import { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaFacebookMessenger, FaWhatsapp, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { contactInfo } from '../data/contactInfo';
import { brandConfig } from '../data/brandConfig';

const Contact = () => {
  return (
    <div className="contact-page pb-5">
      {/* ── 1. Hero Section ── */}
      <section 
        className="contact-hero position-relative d-flex align-items-center justify-content-center text-center"
        style={{
          minHeight: '30vh',
          marginTop: '76px',
          backgroundColor: '#0b0b0f'
        }}
      >
        <Container>
          <span className="hero-subtitle mb-2 text-accent" style={{ letterSpacing: '4px', textTransform: 'uppercase', fontWeight: '700' }}>
            GET IN TOUCH
          </span>
          <h1 className="hero-title fw-bold mb-0">CONNECT WITH THE <span className="text-accent">{brandConfig.brandSuffix === 'DONE DEAL' ? 'TEAM' : brandConfig.brandSuffix}</span></h1>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col lg={8}>
              <h2 className="text-white mb-3">Reach Out to Us</h2>
              <p className="text-secondary" style={{ fontSize: '1.1rem' }}>
                We prefer direct communication to give you the best "{brandConfig.brandSuffix}" experience. 
                <span className="text-accent fw-bold d-block mt-2">Click any of the channels below to start a conversation instantly.</span>
              </p>
            </Col>
          </Row>

          <Row className="g-4 justify-content-center mb-5">
            <Col md={4}>
              <a 
                href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="contact-card-v2 p-4 rounded text-center text-decoration-none d-block h-100"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', transition: 'all 0.3s ease' }}
              >
                <div className="mb-3 d-flex align-items-center justify-content-center" style={{ color: '#25D366' }}>
                  <FaWhatsapp size={48} />
                </div>
                <h4 className="text-white mb-2">WhatsApp / Viber</h4>
                <p className="text-secondary mb-0">{contactInfo.phone}</p>
                <span className="text-accent small mt-3 d-block fw-bold" style={{ letterSpacing: '1px' }}>CLICK TO CHAT</span>
              </a>
            </Col>

            <Col md={4}>
              <a 
                href={contactInfo.facebook} 
                target="_blank" 
                rel="noreferrer"
                className="contact-card-v2 p-4 rounded text-center text-decoration-none d-block h-100"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', transition: 'all 0.3s ease' }}
              >
                <div className="mb-3 d-flex align-items-center justify-content-center" style={{ color: '#0084FF' }}>
                  <FaFacebookMessenger size={48} />
                </div>
                <h4 className="text-white mb-2">Messenger</h4>
                <p className="text-secondary mb-0">Jett Lau Done Deal</p>
                <span className="text-accent small mt-3 d-block fw-bold" style={{ letterSpacing: '1px' }}>SEND A MESSAGE</span>
              </a>
            </Col>

            <Col md={4}>
              <div 
                className="contact-card-v2 p-4 rounded text-center h-100"
                style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }}
              >
                <div className="mb-3 d-flex align-items-center justify-content-center" style={{ color: 'var(--accent-color)' }}>
                  <FaEnvelope size={44} />
                </div>
                <h4 className="text-white mb-2">Email Support</h4>
                <p className="text-secondary mb-0">{contactInfo.email}</p>
                <span className="text-secondary small mt-3 d-block">Available for formal inquiries</span>
              </div>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={10}>
              <hr className="my-5" style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
              <Row className="g-4 text-center text-md-start">
                <Col md={6}>
                  <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ color: 'var(--accent-color)' }}>
                      <FaMapMarkerAlt size={24} />
                    </div>
                    <div>
                      <h5 className="text-white mb-1">Our Showroom</h5>
                      <p className="text-secondary mb-0">{contactInfo.address}</p>
                      <a href={contactInfo.googleMaps} target="_blank" rel="noreferrer" className="text-accent small text-decoration-none fw-bold mt-1 d-inline-block">GET DIRECTIONS</a>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center flex-shrink-0" style={{ color: 'var(--accent-color)' }}>
                      <FaClock size={24} />
                    </div>
                    <div>
                      <h5 className="text-white mb-1">Store Hours</h5>
                      <p className="text-secondary mb-0">{contactInfo.operatingHours}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      {/* ── 4. Map Section ── */}
      <section className="mt-5">
        <div style={{ width: '100%', height: '450px', filter: 'grayscale(1) invert(0.9) contrast(1.2)' }}>
          {/* Using an iframe to embed the location. Note: Ideally this would be the actual embed code from Google */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.0000000000005!2d121.05000000000001!3d14.650000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x74a75f5b6bf8d21f!2sDone%20Deal%20by%20Jett%20Lau!5e0!3m2!1sen!2sph!4v1715516000000!5m2!1sen!2sph" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Done Deal Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default Contact;
