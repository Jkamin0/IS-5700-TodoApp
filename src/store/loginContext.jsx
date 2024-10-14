import { createContext, useState } from "react";

export const LoginContext = createContext({
  error: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export default function LoginContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(null);

  function handleLogin(userName, password) {
    return null;
  }

  function handleLogout() {
    return null;
  }

  const ctxValue = {
    error: error,
    isAuthenticated: isAuthenticated,
    isLoading: isLoading,
    user: user,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <LoginContext.Provider value={ctxValue}>{children}</LoginContext.Provider>
  );
}
