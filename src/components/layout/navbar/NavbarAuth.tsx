//Router-Dom
import { NavLink } from 'react-router-dom';

//Bootstrap
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

//Icons
import { MdAdminPanelSettings } from 'react-icons/md';
import { BsPersonCircle } from 'react-icons/bs';

//Hook - Auth
import { useAuthentication } from '../../../hooks/useAuthentication';

//useContext - Auth
import { useAuthDataContext } from '../../../hooks/useContexts';

//Types
import { NavbarClassProps, NavbarAuthProps } from '../../../types/navbarTypes';
import { NavbarNotifications } from './NavbarNotifications';


//Navegação dos ADMINS
function RenderAdminAuth(acessLevel: number, NAVBAR_CLASS: NavbarClassProps) {
  if (acessLevel > 1) {
    return (
      <>
        <Nav.Link as={NavLink} to="/adm">
          <MdAdminPanelSettings
            className={`${NAVBAR_CLASS.icon} me-4`}
            //Não usa o tamanho padrão dos Icons!!
            size={'2.7em'}
          />
        </Nav.Link>
      </>
    );
  }
}

//Verifica usuário logado ou não e mostra suas respectivas ferramentas.
const NavbarAuth = ({ NAVBAR_CLASS }: NavbarAuthProps) => {
  const { logout } = useAuthentication();
  const { userData, logged, loading } = useAuthDataContext();

  if (loading) {
    return <></>;
  } else {
    if (logged) {
      return (
        <>
          {/* Sino de notificações */}
          <NavbarNotifications NAVBAR_CLASS={NAVBAR_CLASS}/>
          {/* Distintivo de ADMIN */}
          {RenderAdminAuth(userData.acessLevel, NAVBAR_CLASS)}
          {/* Avatar do Logado */}
          <NavDropdown
            active={true}
            title={
              <>
                <BsPersonCircle
                  className={`${NAVBAR_CLASS.icon}`}
                  size={NAVBAR_CLASS.iconSize}
                />
              </>
            }
            id="collasible-nav-dropdown"
            className={`${NAVBAR_CLASS.link + NAVBAR_CLASS.userDropdown} me-4`}
          >
            <NavDropdown.Item
              as={NavLink}
              to="/profile"
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
            <NavDropdown.Item
              onClick={() => {
                logout();
              }}
              className={`${NAVBAR_CLASS.link}`}
            >
              Sign Out
            </NavDropdown.Item>
          </NavDropdown>
        </>
      );
    } else {
      return (
        <>
          {/* Criar conta ou logar. */}
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
            className={`${NAVBAR_CLASS.button + NAVBAR_CLASS.link} px-3 me-3`}
          >
            Sign In
          </Nav.Link>
        </>
      );
    }
  }
};

export default NavbarAuth;
