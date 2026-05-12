import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { contactInfo } from '../data/contactInfo';
import { brandConfig } from '../data/brandConfig';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="gy-4 mb-5">
          <Col lg={4}>
            <div className="footer-brand">
              {brandConfig.name} <span className="text-accent">{brandConfig.brandSuffix}</span>
            </div>
            <p className="text-secondary mb-4">
              {brandConfig.description}
            </p>
            <div className="social-links d-flex gap-3">
              <a href={contactInfo.facebook} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><FaFacebookF /></a>
              <a href={`https://wa.me/${contactInfo.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}><FaWhatsapp /></a>
            </div>
          </Col>
          <Col lg={4}>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>Home</Link></li>
              <li className="mb-2"><Link to="/inventory" style={{color: 'inherit', textDecoration: 'none'}}>Inventory</Link></li>
              <li className="mb-2"><Link to="/buyers" style={{color: 'inherit', textDecoration: 'none'}}>Happy Buyers</Link></li>
              <li className="mb-2"><Link to="/about" style={{color: 'inherit', textDecoration: 'none'}}>About Us</Link></li>
              <li className="mb-2"><Link to="/contact" style={{color: 'inherit', textDecoration: 'none'}}>Contact</Link></li>
            </ul>
          </Col>
          <Col lg={4}>
            <h4 className="mb-4">Contact Us</h4>
            <ul className="list-unstyled text-secondary">
              <li className="mb-3 d-flex align-items-center gap-3">
                <FaMapMarkerAlt className="text-accent" />
                <span>{contactInfo.address}</span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-3">
                <FaPhone className="text-accent" />
                <span>{contactInfo.phone}</span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-3">
                <FaEnvelope className="text-accent" />
                <span>{contactInfo.email}</span>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="text-center text-secondary pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="mb-0 d-flex align-items-center justify-content-center gap-2">
            &copy; {new Date().getFullYear()} {brandConfig.fullName}. All Rights Reserved.
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg"
              alt="Made in the Philippines"
              title="Proudly Philippine"
              style={{ height: '13px', width: 'auto', borderRadius: '2px', opacity: 0.7 }}
            />
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
