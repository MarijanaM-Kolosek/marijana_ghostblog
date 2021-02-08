import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { history } from "./helpers/history";
import { Router, Route, Link } from "react-router-dom";
import { authService } from "./services/auth.service";
import { LoginPage } from "./components/LoginPage";
import { SignUpPage } from "./components/SignUpPage";
import { PostPage } from "./components/PostPage";
import BlogPage from "./components/BlogPage";
import AuthorsPage from "./components/AuthorsPage";
import TagsPage from "./components/TagsPage";
import { Navbar, Nav } from "react-bootstrap";
import store from "./redux/store";

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
    <Provider store={store}>
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
        <Route path="/post" component={PostPage} />
      </Router>
    </Provider>
  );
};

export default App;
