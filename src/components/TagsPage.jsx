import React, { useState, useEffect } from "react";
import { authService } from "../services/auth.service";

const TagsPage = (props) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
    getTags();
  }, []);

  const getTags = () => {
    return fetch(
      `https://demo.ghost.io/ghost/api/v3/content/tags/?key=22444f78447824223cefc48062&include=count.posts`
    )
      .then((res) => res.json())
      .then((data) => setTags(data.tags));
  };

  return (
    <div>
      <table className="tagListTable">
        <tbody>
          <tr className="tagsHeader">
            <td>Image</td>
            <td>Name</td>
            <td>Description</td>
            <td>Num. of posts</td>
          </tr>
          {tags.map((tag) => (
            <tr>
              <td>
                <img className="tagImage" src={tag.feature_image}></img>
              </td>
              <td>{tag.name}</td>
              <td>{tag.description}</td>
              <td>{tag.count.posts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { TagsPage };
