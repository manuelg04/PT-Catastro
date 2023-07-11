/* eslint-disable @typescript-eslint/no-empty-function */
import {
  createContext, useContext, useMemo, useState,
} from 'react';

type AuthContextValue = {
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

type AuthProviderProps = {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const AuthContextVal = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
    }),
    [isAuthenticated],
  );
  return (
    <AuthContext.Provider value={AuthContextVal}>
      {children}
    </AuthContext.Provider>
  );
};
