import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaMotorcycle } from 'react-icons/fa';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { brandConfig } from '../data/brandConfig';

const NavigationBar = () => {
  const { pathname, hash } = useLocation();
  const getSectionLinkClass = (sectionHash) =>
    `nav-link nav-link-item ${pathname === '/' && hash === sectionHash ? 'nav-link-active' : ''}`;

  return (
    <Navbar expand="lg" fixed="top" className="glass-nav" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <FaMotorcycle className="text-accent" />
          <span>{brandConfig.name} <span className="text-accent">{brandConfig.brandSuffix}</span></span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/99/Flag_of_the_Philippines.svg"
            alt="Philippines"
            style={{ height: '14px', width: 'auto', borderRadius: '2px', opacity: 0.85, marginLeft: '4px' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" end className={({ isActive }) => `nav-link nav-link-item ${isActive ? 'nav-link-active' : ''}`}>HOME</NavLink>
            <NavLink to="/inventory" className={({ isActive }) => `nav-link nav-link-item ${isActive ? 'nav-link-active' : ''}`}>INVENTORY</NavLink>
            <NavLink to="/buyers" className={({ isActive }) => `nav-link nav-link-item ${isActive ? 'nav-link-active' : ''}`}>BUYERS</NavLink>
            <NavLink to="/about" className={({ isActive }) => `nav-link nav-link-item ${isActive ? 'nav-link-active' : ''}`}>ABOUT</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link nav-link-item ${isActive ? 'nav-link-active' : ''}`}>CONTACT</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
