import { useContext, useState } from "react";
import { LoginContext } from "../store/loginContext";
import Header from "../components/Header";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";

export default function Authenticate() {
  const { login, createUser, isLoading, error, user, logout } =
    useContext(LoginContext);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isCreatingAccount) {
      await createUser(userName, password);
    } else {
      await login(userName, password);
    }
  }

  return (
    <>
      <Header />
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper elevation={3} style={{ width: "600px", padding: "16px" }}>
          {user ? (
            <Box textAlign="center">
              <Typography variant="h4">Welcome, {user.username}!</Typography>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={logout}
                style={{ marginTop: "16px" }}
              >
                Logout
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="h4" align="center">
                {isCreatingAccount ? "Create Account" : "Login"}
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && (
                  <Typography color="error" align="center">
                    {error}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {isLoading
                    ? "Loading..."
                    : isCreatingAccount
                    ? "Create Account"
                    : "Login"}
                </Button>
                <Button
                  variant="text"
                  color="primary"
                  fullWidth
                  onClick={() => setIsCreatingAccount((prev) => !prev)}
                >
                  {isCreatingAccount
                    ? "Already have an account? Login"
                    : "Don't have an account? Create one"}
                </Button>
              </form>
            </>
          )}
        </Paper>
      </Box>
    </>
  );
}
