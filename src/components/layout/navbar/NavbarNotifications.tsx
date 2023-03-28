//React
import { useState } from 'react';

//Router-Dom
import { NavLink } from 'react-router-dom';

//Bootstrap
import NavDropdown from 'react-bootstrap/NavDropdown';

//Icons
import { BsFillBellFill } from 'react-icons/bs';

//Hook - Auth
import { useAuthentication } from '../../../hooks/useAuthentication';

//useContext - Auth
import { useAuthDataContext } from '../../../hooks/useContexts';

//Types
import { NavbarClassProps } from '../../../types/navbarTypes';
import { NotificationsProps } from '../../../types/autheticationTypes';
import { Badge } from 'react-bootstrap';

type NavbarNotificationProps = {
  NAVBAR_CLASS: NavbarClassProps;
};

const NavbarNotifications = ({ NAVBAR_CLASS }: NavbarNotificationProps) => {
  const { userData } = useAuthDataContext();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updateNotification } = useAuthentication();

  const [notifications, setNotifications] = useState<NotificationsProps[]>(
    userData?.notifications?.filter(
      notification => notification.read === false,
    ),
  );

  const handleNotificationClick = async (notification: NotificationsProps) => {
    //await updateNotification(notification, userData);
    setNotifications(
      notifications.filter(
        notifications => notifications.id !== notification.id,
      ),
    );
  };

  console.log(notifications);

  return (
    <>
      <NavDropdown
        active={true}
        title={
          <>
            <BsFillBellFill
              className={NAVBAR_CLASS.icon}
              size={NAVBAR_CLASS.iconSize}
            />
            {notifications && notifications.length > 0 ? (
              <Badge className="navbar__badge" bg="danger">
                {notifications.length}
              </Badge>
            ) : null}
          </>
        }
        className={`${
          NAVBAR_CLASS.link + NAVBAR_CLASS.notificationDropdown
        }  me-4`}
        aria-label='Abrir notificações'
      >
        <>
          {notifications && notifications.length === 0 ? (
            <span>No notifications yet</span>
          ) : (
            <>
              {notifications &&
                notifications.map(notification => (
                  <NavDropdown.Item
                    key={notification.from}
                    as={NavLink}
                    to={`/${notification.from}`}
                    onClick={() => {
                      handleNotificationClick(notification);
                    }}
                    aria-label={`Ir para o chamado referente ao assunto: ${notification.subject}`}
                    tabIndex={0}
                  >
                    {notification.subject}
                  </NavDropdown.Item>
                ))}
            </>
          )}
        </>
        <NavDropdown.Divider />
        <NavDropdown.Item
          as={NavLink}
          className={`${NAVBAR_CLASS.link} text-center`}
          to="/notifications"
          aria-label='Ver todas as notificações'
          tabIndex={0}
        >
          See all notifications
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export { NavbarNotifications };
