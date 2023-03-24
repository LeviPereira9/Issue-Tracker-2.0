//Context
import { createContext } from 'react';

import {
  AuthDataContextProps,
  AuthDataProviderProps,
} from '../types/autheticationTypes';

export const AuthData = createContext<AuthDataContextProps>(
  {} as AuthDataContextProps,
);

export const AuthDataProvider = ({
  children,
  userData,
  logged,
  loading,
}: AuthDataProviderProps) => {
  return (
    <AuthData.Provider value={{ userData, logged, loading }}>
      {children}
    </AuthData.Provider>
  );
};
