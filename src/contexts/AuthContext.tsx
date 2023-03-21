import { useContext, createContext } from 'react';
import { Users } from '../types/collectionsType';

const AuthContext = createContext<Users>({} as Users);

export function AuthProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Users;
}) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthValue() {
  return useContext(AuthContext);
}
