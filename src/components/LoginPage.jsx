import React from "react";
import { Link } from "react-router-dom";

import { authService } from "../services/auth.service";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      error: null,
    };

    if (authService.currentUserValue) {
        this.props.history.push("/home");
    }
  }

  change(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    e.preventDefault();
    const { username, password } = this.state;
    authService.login(username, password).then(
      (user) => {
        const { from } = this.props.location.state || {
            from: { pathname: "/home" },
          };
          this.props.history.push(from);
      },
      (error) => {
        this.setState({ error: "Invalid username or password." });
      }
    );
  }

  render() {
    return (
      <div className="centeredDiv">
          <form onSubmit={(e) => this.login(e)} >
            <input
              className="regularInput"
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.change(e)}
              required
              placeholder="email"
            />
            <br />
            <input
              className="regularInput"
              type="password"
              name="password"
              value={this.state.password}
              onChange={(e) => this.change(e)}
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
          {this.state.error && (
            <div className={"alert alert-danger"}>{this.state.error}</div>
          )}
        </div>
    );
  }
}

export { LoginPage };