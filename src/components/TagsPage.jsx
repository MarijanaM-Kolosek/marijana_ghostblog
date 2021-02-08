import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { authService } from "../services/auth.service";
import { fetchTags } from "../redux/actions/tagsActions";

const TagsPage = (props) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);

  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
    dispatch(fetchTags());
  }, []);

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

export default TagsPage;
