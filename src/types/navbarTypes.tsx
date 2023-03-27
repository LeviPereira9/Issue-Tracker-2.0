type NavbarClassProps = {
    link: string;
    icon: string;
    iconSize:string;
    button: string;
    userDropdown: string;
    notificationDropdown: string;
  };
  
  type NavbarAuthProps = {
    NAVBAR_CLASS: NavbarClassProps;
  };

export type {NavbarClassProps, NavbarAuthProps}