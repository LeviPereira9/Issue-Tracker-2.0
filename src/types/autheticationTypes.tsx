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

export type { FormRegister, CreateAuth, Users, LogIn };
