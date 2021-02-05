import React, { Component } from "react";
import { authService } from "../services/auth.service";
import { registrationService } from "../services/registration.service";

export class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      fullname: "",
      country: "",
    };

    if (authService.currentUserValue) {
      this.props.history.push("/blog");
    }
  }

  change(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signup(e) {
    e.preventDefault();
    const { username, password, fullname, country } = this.state;
    registrationService.register(username, password, fullname, country).then(
      (user) => {
        window.location.reload(true);
      },
      (error) => {
        this.setState({ error: "Ups... something went wrong." });
      }
    );
  }

  render() {
    return (
      <div className="centeredDiv">
        <form onSubmit={(e) => this.signup(e)}>
          <label htmlFor="username" className="whiteLabel">
            Email
          </label>
          <input
            className="regularInput"
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.change(e)}
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
            value={this.state.password}
            onChange={(e) => this.change(e)}
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
            value={this.state.fullname}
            onChange={(e) => this.change(e)}
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
            value={this.state.country}
            onChange={(e) => this.change(e)}
          />
          <br />
          <button className="smallBtn" type="submit">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
