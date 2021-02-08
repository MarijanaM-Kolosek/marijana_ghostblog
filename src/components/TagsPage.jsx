import React, { useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import { connect } from "react-redux";
import { fetchTags } from "../redux/actions/tagsActions";

const TagsPage = (props) => {
  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
    props.fetchTags();
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
          {props.tags.map((tag) => (
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

const mapStateToProps = (state) => ({ tags: state.tags.tags });

export default connect(mapStateToProps, { fetchTags })(TagsPage);
