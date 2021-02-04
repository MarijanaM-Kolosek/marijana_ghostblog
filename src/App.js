import React from "react";
// import "./App.css";
import { history } from "./helpers/history";
import { Router, Route } from "react-router-dom";
import { authService } from "./services/auth.service";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { BlogPage } from "./components/BlogPage";

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

  logout() {
    authService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <React.Fragment>
        {currentUser && (
          <React.Fragment>
            <nav className="navbar sticky-top navbar-dark bg-dark">
              <div className="navbar-nav">
                <a onClick={this.logout} className="nav-item nav-link">
                  Logout
                </a>
              </div>
            </nav>
          </React.Fragment>
        )}
        <Router history={history}>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/blog" component={BlogPage} />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
