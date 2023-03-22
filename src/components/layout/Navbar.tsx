import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

type Props = {};

const NavBar = (props: Props) => {
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="navbar__brand">
          Track Issue 2.0
        </Navbar.Brand>
        <div className='d-flex'>
        <Nav className='d-flex d-lg-none flex-row '>
            <Nav.Link as={NavLink} to="/register" className='navbar__link me-2'>
              Sign Up
            </Nav.Link>
            <Nav.Link as={NavLink} to="/login" className='navbar__link px-3 me-3 navbar-button'>
              Sign In
            </Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" className="navbar__link">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/priorities" className="navbar__link">
              Priorities
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/secure_practices"
              className="navbar__link"
            >
              Secure Practices
            </Nav.Link>
            <NavDropdown
              title="Tickets"
              id="collasible-nav-dropdown"
              className="navbar__link"
            >
              <NavDropdown.Item
                as={NavLink}
                to="/anonymous_ticket"
                className="navbar__link"
              >
                Open anonymous Ticket
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/internal_ticket"
                className="navbar__link"
              >
                Open internal Ticket
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                as={NavLink}
                to="/tickets"
                className="navbar__link"
              >
                My Tickets
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={NavLink} to="/faq" className="navbar__link">
              FAQ
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Nav className="d-none d-lg-flex">
        <Nav.Link as={NavLink} to="/register" className="navbar__link me-2">
          Sign Up
        </Nav.Link>
        <Nav.Link
          as={NavLink}
          to="/login"
          className="navbar__link px-3 me-3 navbar-button"
        >
          Sign In
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
