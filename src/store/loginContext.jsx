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
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const userApi = useApi("users");

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await userApi.getByField("isLoggedIn", true);
      if (storedUser) {
        setUser(storedUser);
        setIsAuthenticated(true);
      }
    };
    fetchUser();
  }, []);

  async function handleLogin(userName, password) {
    setIsLoading(true);
    setError(null);

    try {
      const user = await userApi.getByField("username", userName);
      if (user && user.password === password) {
        setUser({ ...user, isLoggedIn: true });
        setIsAuthenticated(true);
        await userApi.update(user.id, { ...user, isLoggedIn: true });
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
      await userApi.update(user.id, { ...user, isLoggedIn: false });
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

      const newUser = { username: userName, password, isLoggedIn: false };
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
