import React from "react";
import "./App.css";
import { history } from "./helpers/history";
import { Router, Route } from "react-router-dom";
import { authService } from "./services/auth.service";
import { LoginPage } from "./components/LoginPage";
import { HomePage } from "./components/HomePage";
import { SignUpPage } from "./components/SignUpPage";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  componentDidMount() {
    authService.currentUser.subscribe((x) => {
      this.setState({
        currentUser: x,
      });
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <Route path="/home" component={HomePage} />
      </Router>
    );
  }
}

export default App;
