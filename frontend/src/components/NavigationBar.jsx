import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaMotorcycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar expand="lg" fixed="top" className="glass-nav" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <FaMotorcycle className="text-accent" />
          <span>JETT LAU <span className="text-accent">DONE DEAL</span></span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">HOME</Nav.Link>
            <Nav.Link as={Link} to="/inventory">INVENTORY</Nav.Link>
            <Nav.Link href="/#buyers">BUYERS</Nav.Link>
            <Nav.Link href="/#about">ABOUT</Nav.Link>
            <Nav.Link href="/#contact">CONTACT</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
