//Router-Dom
import { NavLink } from 'react-router-dom';

//Bootstrap
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

//Icons
import { MdAdminPanelSettings } from 'react-icons/md';
import { BsPersonCircle, BsFillBellFill } from 'react-icons/bs';

//Hook - Auth
import { useAuthentication } from '../../../hooks/useAuthentication';

//useContext - Auth
import { useAuthDataContext } from '../../../hooks/useContexts';

//Types
import { NavbarClassProps, NavbarAuthProps } from '../../../types/navbarTypes';
import { Users } from '../../../types/autheticationTypes';

function RenderNotifications(
  NAVBAR_CLASS: NavbarClassProps,
  updateNotification: any,
  userData: Users
) {
  return (
    <>
      <NavDropdown
        active={true}
        title={
          <>
            <BsFillBellFill className={NAVBAR_CLASS.icon} size="2em" />
          </>
        }
        className={`${NAVBAR_CLASS.link + NAVBAR_CLASS.userDropdown} me-4`}
      >
        <>
          {userData.notifications !== undefined && userData.notifications.filter(notification => notification.read === false)
            .length === 0 ? (
            <span>Volte</span>
          ) : (
            <>
              {userData.notifications !== undefined && userData.notifications
                .filter(notification => notification.read === false)
                .map(notification => (
                  <NavDropdown.Item
                    key={notification.from}
                    as={NavLink}
                    to={`/${notification.from}`}
                    onClick={() => {
                      updateNotification(notification, userData);
                    }}
                  >
                    {notification.subject}
                  </NavDropdown.Item>
                ))}
            </>
          )}
        </>
      </NavDropdown>
    </>
  );
}

function RenderAdminAuth(acessLevel: number, NAVBAR_CLASS: NavbarClassProps) {
  if (acessLevel > 1) {
    return (
      <>
        <Nav.Link as={NavLink} to="/adm">
          <MdAdminPanelSettings
            className={`${NAVBAR_CLASS.icon} me-4`}
            size={'2.7em'}
          />
        </Nav.Link>
      </>
    );
  }
}

const NavbarAuth = ({ NAVBAR_CLASS }: NavbarAuthProps) => {
  const { logout, updateNotification } = useAuthentication();
  const { userData, logged, loading } = useAuthDataContext();

  if (loading) {
    return <></>;
  } else {
    if (logged) {
      return (
        <>
          { userData !== undefined && RenderNotifications(
            NAVBAR_CLASS,
            updateNotification,
            userData
          )}
          { userData && RenderAdminAuth(userData.acessLevel, NAVBAR_CLASS)}
          <NavDropdown
            active={true}
            title={
              <>
                <BsPersonCircle
                  className={`${NAVBAR_CLASS.icon}`}
                  size={'2em'}
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
