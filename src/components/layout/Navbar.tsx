//Router-Dom
import { NavLink } from 'react-router-dom';

//Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

//Components
import NavbarAuth from './NavbarAuth';

type Props = {};

const NAVBAR_CLASS = {
  link: 'navbar__link ',
  icon: 'navbar__icon ',
  button: 'navbar__button ',
  userDropdown: 'navbar__userDropdown ',
};



const NavBar = (props: Props) => {
  return (
    <>
      <Navbar bg="light" expand="md" className="mb-3">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            Track Issue 2.0
          </Navbar.Brand>
          <Navbar.Offcanvas
            id="offcanvasNavbar-expand-md"
            aria-labelledby="offcanvasNavbarLabel-expand-md"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel-expand-md">
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1 pe-3">
                <Nav.Link
                  as={NavLink}
                  to="/"
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
            <NavbarAuth logged={true} NAVBAR_CLASS={NAVBAR_CLASS} acessLevel={2} />
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md" />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

// eslint-disable-next-line no-lone-blocks

export default NavBar;
