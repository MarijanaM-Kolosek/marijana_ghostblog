import React, { useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { registrationService } from "../services/registration.service";

const SignUpPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authService.currentUserValue) {
      props.history.push("/blog");
    }
  });

  const signup = (e) => {
    e.preventDefault();
    registrationService.register(username, password, fullName, country).then(
      (user) => {
        //window.location.reload(true);
      },
      (error) => {
        setError("Ups... something went wrong.");
      }
    );
  };

  return (
    <div className="centeredDiv">
      <form onSubmit={(e) => signup(e)}>
        <label htmlFor="username" className="whiteLabel">
          Email
        </label>
        <input
          className="regularInput"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password" className="whiteLabel">
          Password
        </label>
        <input
          className="regularInput"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label htmlFor="fullname" className="whiteLabel">
          Full name
        </label>
        <input
          className="regularInput"
          type="text"
          name="fullname"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <br />
        {/* #toDo add options for countries instead of text*/}
        <label htmlFor="country" className="whiteLabel">
          Country
        </label>
        <input
          className="regularInput"
          type="text"
          name="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
        <br />
        <button className="smallBtn" type="submit">
          Sign up
        </button>
      </form>
    </div>
  );
};

export { SignUpPage };
