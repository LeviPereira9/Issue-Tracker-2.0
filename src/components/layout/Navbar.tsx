import { useAuthentication } from '../../hooks/useAuthentication';
type Props = {};

const Navbar = (props: Props) => {
  const { logout } = useAuthentication();

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        Log out
      </button>
    </div>
  );
};

export default Navbar;
