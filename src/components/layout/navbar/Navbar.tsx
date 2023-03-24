//Router-Dom
import { NavLink } from 'react-router-dom';

//Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

//icons
import { MdScreenSearchDesktop } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';

//Components
import NavbarAuth from './NavbarAuth';

//Types
import { NavbarClassProps } from '../../../types/navbarTypes';

const NAVBAR_CLASS: NavbarClassProps = {
  link: 'navbar__link ',
  icon: 'navbar__icon ',
  button: 'navbar__button ',
  userDropdown: 'navbar__userDropdown ',
};

const NavBar = () => {
  return (
    <>
      <Navbar expand="md" className="mb-3">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            Track{' '}
            <MdScreenSearchDesktop className={NAVBAR_CLASS.icon} size={'2em'} />{' '}
            Issue
          </Navbar.Brand>
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link
                  as={NavLink}
                  to="/"
                  end
                  className={`${NAVBAR_CLASS.link}`}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/priorities"
                  className={`${NAVBAR_CLASS.link}`}
                >
                  Priorities
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/secure_practices"
                  className={`${NAVBAR_CLASS.link}`}
                >
                  Secure Practices
                </Nav.Link>
                <NavDropdown
                  title="Tickets"
                  id="collasible-nav-dropdown"
                  className={`${NAVBAR_CLASS.link}`}
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to="/anonymous_ticket"
                    className={`${NAVBAR_CLASS.link}`}
                  >
                    Anonymous
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/internal_ticket"
                    className={`${NAVBAR_CLASS.link}`}
                  >
                    Internal
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/tickets"
                    className={`${NAVBAR_CLASS.link}`}
                  >
                    My Tickets
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={NavLink}
                  to="/faq"
                  className={`${NAVBAR_CLASS.link}`}
                >
                  FAQ
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Nav className="flex-row align-items-center">
            <NavbarAuth NAVBAR_CLASS={NAVBAR_CLASS} />
            <Navbar.Toggle
              as={FiMenu}
              className="p-0"
              size={'2em'}
              aria-controls="offcanvasNavbar-expand-md"
            />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
