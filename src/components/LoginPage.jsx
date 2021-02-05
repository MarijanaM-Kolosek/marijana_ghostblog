import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { authService } from "../services/auth.service";

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authService.currentUserValue) {
      props.history.push("/blog");
    }
  });

  const login = (e) => {
    e.preventDefault();
    authService.login(username, password).then(
      (user) => {
        const { from } = props.location.state || {
          from: { pathname: "/blog" },
        };
        props.history.push(from);
      },
      (error) => {
        setError("Invalid username or password.");
      }
    );
  };

  return (
    <div className="centeredDiv">
      <form onSubmit={(e) => login(e)}>
        <input
          className="regularInput"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="email"
        />
        <br />
        <input
          className="regularInput"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="password"
        />
        <br />
        <button type="submit" className="smallBtn">
          Login
        </button>
      </form>
      <Link to="/signup" className="link">
        Don't have an account? Sign up!
      </Link>
      {error && <div className={"alert alert-danger"}>{error}</div>}
    </div>
  );
};

export { LoginPage };
