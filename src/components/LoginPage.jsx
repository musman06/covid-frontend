import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  function handleLogin(e) {
    e.preventDefault();
    const isAuthenticated = login(email, password);
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }
  return (
    <div className="container">
      <h1>Welcome To The Covid Dashboard!</h1>
      <form>
        <input
          type="text"
          onChange={(e) => setEmail(e?.target?.value)}
          value={email}
          name="email"
          placeholder="email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          placeholder="Password"
        />
        <button className="login-submit" onClick={handleLogin}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
