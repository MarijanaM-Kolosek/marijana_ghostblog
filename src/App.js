import React from "react";
// import "./App.css";
import { history } from "./helpers/history";
import { Router, Route, Link } from "react-router-dom";
import { authService } from "./services/auth.service";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { BlogPage } from "./components/BlogPage";
import { AuthorsPage } from "./components/AuthorsPage";
import { Navbar, Nav } from "react-bootstrap";

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
        <Router history={history}>
          {currentUser && (
            <React.Fragment>
              <Navbar bg="dark" variant="dark" fixed="top">
                <Nav className="mr-auto">
                  <Link to="/blog" className="nav-item nav-link">
                    Blog
                  </Link>
                  <Link to="/authors" className="nav-item nav-link">
                    Authors
                  </Link>
                  <a onClick={this.logout} className="nav-item nav-link">
                    Logout
                  </a>
                  {/* <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#features">Features</Nav.Link>
                  <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                </Nav>
              </Navbar>
              {/* <nav className="navbar sticky-top navbar-dark bg-dark">
                <div className="navbar-nav">
                  <Link
                    to="/authors"
                    className="nav-item nav-link"
                  >
                    Authors
                  </Link>
                  <a onClick={this.logout} className="nav-item nav-link">
                    Logout
                  </a>
                </div>
              </nav> */}
            </React.Fragment>
          )}
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/authors" component={AuthorsPage} />
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
