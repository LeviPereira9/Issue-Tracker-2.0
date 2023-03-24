//Router-Dom
import { NavLink } from 'react-router-dom';

//Bootstrap
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

//Icons
import { MdAdminPanelSettings } from 'react-icons/md';
import { BsPersonCircle } from 'react-icons/bs';


type NavbarClassProps = {
    link: string,
    icon: string,
    button: string,
    userDropdown: string
}
  
type NavbarAuthProps = {
    logged: boolean,
    NAVBAR_CLASS: NavbarClassProps,
    acessLevel: number
}


function renderAdminAuth(acessLevel:number, NAVBAR_CLASS:NavbarClassProps) {
    if (acessLevel > 1) {
      return (
        <>
          <MdAdminPanelSettings
            className={`${NAVBAR_CLASS.icon} me-4`}
            size={'2.7em'}
          />
        </>
      );
    }
  }

  
const NavbarAuth = ({logged, NAVBAR_CLASS, acessLevel}: NavbarAuthProps) => {
    if (logged) {
      return (
        <>
          {renderAdminAuth(acessLevel, NAVBAR_CLASS)}
          <NavDropdown
            active={true}
            title={
              <>
                <BsPersonCircle className={`${NAVBAR_CLASS.icon}`} size={'2em'} />
              </>
            }
            id="collasible-nav-dropdown"
            className={`${
              NAVBAR_CLASS.link + NAVBAR_CLASS.userDropdown
            } me-4`}
          >
            <NavDropdown.Item
              as={NavLink}
              to="/perfil"
              className={`${NAVBAR_CLASS.link}`}
            >
              Profile
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to="/settings"
              className={`${NAVBAR_CLASS.link}`}
            >
              Settings
            </NavDropdown.Item>
            <NavDropdown.Item
              as={NavLink}
              to="/help"
              className={`${NAVBAR_CLASS.link}`}
            >
              Help
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item className={`${NAVBAR_CLASS.link}`}>
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        </>
      );
    } else {
      return (
        <>
          <Nav.Link
            as={NavLink}
            to="/register"
            className={`${NAVBAR_CLASS.link} me-2`}
          >
            Sign Up
          </Nav.Link>
          <Nav.Link
            as={NavLink}
            to="/login"
            className={`${NAVBAR_CLASS.button} px-3 me-3`}
          >
            Sign In
          </Nav.Link>
        </>
      );
    }
  }

export default NavbarAuth;