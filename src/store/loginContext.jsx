import { createContext, useState, useEffect } from "react";
import { useApi } from "../Api/api";

export const LoginContext = createContext({
  error: null,
  isAuthenticated: false,
  isLoading: false,
  user: null,
  login: () => {},
  logout: () => {},
  createUser: () => {},
});

export default function LoginContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userApi = useApi("users");

  useEffect(() => {
    // Using this instead of API, had problems getting API to only keep a single
    // user instead of continually adding to the table of logged in users
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, [user]);

  async function handleLogin(userName, password) {
    setIsLoading(true);
    setError(null);

    try {
      const user = await userApi.getByField("username", userName);
      if (user && user.password === password) {
        setUser(user);
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    setIsLoading(true);
    setError(null);

    try {
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCreateUser(userName, password) {
    setIsLoading(true);
    setError(null);

    try {
      const existingUser = await userApi.getByField("username", userName);
      if (existingUser) {
        throw new Error("Username already taken");
      }

      const newUser = { username: userName, password };
      const newUserId = await userApi.create(newUser);
      const createdUser = await userApi.getById(newUserId);

      setUser(createdUser);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const ctxValue = {
    error,
    isAuthenticated,
    isLoading,
    user,
    login: handleLogin,
    logout: handleLogout,
    createUser: handleCreateUser,
  };

  return (
    <LoginContext.Provider value={ctxValue}>{children}</LoginContext.Provider>
  );
}
