import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authService } from "../services/auth.service";
import { fetchAuthors } from "../redux/actions/authorsActions";

const AuthorsPage = (props) => {
  const dispatch = useDispatch();
  const authors = useSelector((state) => state.authors.authors);

  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
    dispatch(fetchAuthors());
  }, []);

  return (
    <div>
      {authors.map((author) => (
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

export default AuthorsPage;
