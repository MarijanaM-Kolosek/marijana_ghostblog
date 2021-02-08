import React, { useState, useEffect } from "react";
import { history } from "./helpers/history";
import { Router, Route, Link } from "react-router-dom";
import { authService } from "./services/auth.service";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import BlogPage from "./components/BlogPage";
import { AuthorsPage } from "./components/AuthorsPage";
import { TagsPage } from "./components/TagsPage";
import { Navbar, Nav } from "react-bootstrap";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    authService.currentUser.subscribe((x) => {
      setCurrentUser(x);
    });
  }, []);

  const logout = () => {
    authService.logout();
    history.push("/login");
  };

  return (
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
              <Link to="/tags" className="nav-item nav-link">
                Tags
              </Link>
              <a onClick={logout} className="nav-item nav-link">
                Logout
              </a>
            </Nav>
          </Navbar>
        </React.Fragment>
      )}
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignUpPage} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/authors" component={AuthorsPage} />
      <Route path="/tags" component={TagsPage} />
    </Router>
  );
};

export default App;
