import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id="contact" className="footer">
      <Container>
        <Row className="gy-4 mb-5">
          <Col lg={4}>
            <div className="footer-brand">
              JETT LAU <span className="text-accent">DONE DEAL</span>
            </div>
            <p className="text-secondary mb-4">
              Your premier destination for high-quality, second-hand adventure bigbikes in the Philippines.
            </p>
            <div className="social-links">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </Col>
          <Col lg={4}>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="list-unstyled text-secondary">
              <li className="mb-2"><a href="#home" style={{color: 'inherit', textDecoration: 'none'}}>Home</a></li>
              <li className="mb-2"><a href="#inventory" style={{color: 'inherit', textDecoration: 'none'}}>Current Inventory</a></li>
              <li className="mb-2"><a href="#about" style={{color: 'inherit', textDecoration: 'none'}}>About Us</a></li>
              <li className="mb-2"><a href="#contact" style={{color: 'inherit', textDecoration: 'none'}}>Contact</a></li>
            </ul>
          </Col>
          <Col lg={4}>
            <h4 className="mb-4">Contact Us</h4>
            <ul className="list-unstyled text-secondary">
              <li className="mb-3 d-flex align-items-center gap-3">
                <FaMapMarkerAlt className="text-accent" />
                <span>Metro Manila, Philippines</span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-3">
                <FaPhone className="text-accent" />
                <span>+63 917 123 4567</span>
              </li>
              <li className="mb-3 d-flex align-items-center gap-3">
                <FaEnvelope className="text-accent" />
                <span>sales@jettlaudonedeal.ph</span>
              </li>
            </ul>
          </Col>
        </Row>
        <div className="text-center text-secondary pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="mb-0 d-flex align-items-center justify-content-center gap-2">
            &copy; {new Date().getFullYear()} Jett Lau Done Deal. All Rights Reserved.
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
