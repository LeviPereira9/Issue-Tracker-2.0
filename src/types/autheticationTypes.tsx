//User Collection
type Users = {
  firstName: string;
  lastName: string;
  department: string;
  email: string;
  acessLevel: number;
  terms: boolean;
};

//Formulário de Registro
type FormRegister = {
  firstName?: string;
  lastName?: string;
  department?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acessLevel?: number;
  terms?: boolean;
};

//CreateAccount
type CreateAuth = {
  email: string;
  password: string;
};

//Formulário de Login
type LogIn = {
  email?: string;
  password?: string;
  rememberMe?: boolean;
};

//SideContent
type SideContentProps = {
  className: string;
  title: string;
  text: string;
  toRedirect: string;
  toText: string;
  label: string;
  imgUrl: string;
};

//Context Props
//Context - AuthData
type AuthDataContextProps = {
  userData: Users;
  logged: boolean;
  loading: boolean;
};

//Provider - AuthData
type AuthDataProviderProps = {
  children: React.ReactNode;
  userData: Users;
  logged: boolean;
  loading: boolean;
};

export type {
  FormRegister,
  CreateAuth,
  Users,
  LogIn,
  SideContentProps,
  AuthDataContextProps,
  AuthDataProviderProps,
};
