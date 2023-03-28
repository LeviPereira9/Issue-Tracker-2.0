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
  iconSize: '2em',
  button: 'navbar__button ',
  userDropdown: 'navbar__userDropdown ',
  notificationDropdown: 'navbar__notificationDropdown',
};

const NavBar = () => {
  return (
    <>
      <Navbar expand="md" className="mb-3">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/" aria-label='ir para página principal' tabIndex={0}>
            Track{' '}
            <MdScreenSearchDesktop className={NAVBAR_CLASS.icon} size={NAVBAR_CLASS.iconSize} />{' '}
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
                  aria-label='Ir para página principal'
                  tabIndex={0}
                  end
                  className={`${NAVBAR_CLASS.link}`}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/priorities"
                  aria-label='Ir para página de problemas em prioridade'
                  tabIndex={0}
                  className={`${NAVBAR_CLASS.link}`}
                >
                  Priorities
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/secure_practices"
                  aria-label='Ir para página de dicas de segurança'
                  tabIndex={0}
                  className={`${NAVBAR_CLASS.link}`}
                >
                  Secure Practices
                </Nav.Link>
                <NavDropdown
                  title="Tickets"
                  id="collasible-nav-dropdown"
                  aria-label='Abrir menu de tickets'
                  className={`${NAVBAR_CLASS.link}`}
                >
                  <NavDropdown.Item
                    as={NavLink}
                    to="/anonymous_ticket"
                    aria-label='Ir para o formulário de chamado anônimo'
                    tabIndex={0}
                    className={`${NAVBAR_CLASS.link}`}
                  >
                    Anonymous
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={NavLink}
                    to="/internal_ticket"
                    aria-label='Ir para o formulário de chamado interno'
                    tabIndex={0}
                    className={`${NAVBAR_CLASS.link}`}
                  >
                    Internal
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={NavLink}
                    to="/tickets"
                    aria-label='Ir para página com todos os seus tickets'
                    tabIndex={0}
                    className={`${NAVBAR_CLASS.link}`}
                  >
                    My Tickets
                  </NavDropdown.Item>
                </NavDropdown>
                <Nav.Link
                  as={NavLink}
                  to="/faq"
                  aria-label='Ir para página de perguntas e respostas frequentes'
                  tabIndex={0}
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
              size={NAVBAR_CLASS.iconSize}
              aria-label='Abrir menu de navegação'
              tabIndex={0}
              aria-controls="offcanvasNavbar-expand-md"
            />
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
