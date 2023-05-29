import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./styles.css";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const LoginPage = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogin = () => {
    let user = {
      email,
      password,
      roles: value === 0 ? ["user"] : ["admin"],
    };
    setAuth({ user });
    if (value === 0) navigate("/");
    else navigate("/admin");
  };

  return (
    <div class="body">
      <div class="login">
        <h2>Login Page</h2>
        <Box sx={{ width: "100%", marginBottom: 5 }}>
          <Tabs value={value} onChange={handleChange} centered>
            <Tab label="User" />
            <Tab label="Admin" />
          </Tabs>
        </Box>
        <input
          style={{ margin: 5 }}
          type="email"
          id="Uname"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          style={{ margin: 5 }}
          type="password"
          id="Pass"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button style={{ margin: 5 }} id="log" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
