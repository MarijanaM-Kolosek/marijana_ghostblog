import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { authService } from "../services/auth.service";
import { fetchAuthors } from "../redux/actions/authorsActions";

const AuthorsPage = (props) => {
  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
    props.fetchAuthors();
  }, []);

  return (
    <div>
      {props.authors.map((author) => (
        <table className="authorTable" key={author.id}>
          <tbody>
            <tr>
              <td rowSpan="2" className="tdAuthorImage">
                <img
                  src={author.profile_image}
                  className="authorImageInTd"
                ></img>
              </td>
              <td className="tdAuthorName">{author.name}</td>

              <td>total number of posts: {author.count.posts}</td>
            </tr>
            <tr>
              <td colSpan="2">{author.bio}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({ authors: state.authors.authors });

export default connect(mapStateToProps, { fetchAuthors })(AuthorsPage);
