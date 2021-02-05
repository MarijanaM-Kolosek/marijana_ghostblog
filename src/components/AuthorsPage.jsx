import React, { useState, useEffect } from "react";
import { authService } from "../services/auth.service";

const AuthorsPage = (props) => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
    getAuthors();
  }, []);

  const getAuthors = () => {
    return fetch(
      `https://demo.ghost.io/ghost/api/v3/content/authors/?key=22444f78447824223cefc48062&include=count.posts`
    )
      .then((res) => res.json())
      .then((data) => setAuthors(data.authors));
  };

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

export { AuthorsPage };
