import React, { useState, useEffect } from "react";
import * as moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { authService } from "../services/auth.service";
import { createNewTag } from "../redux/actions/tagsActions";
import { addNewTagToPost, fetchPostById } from "../redux/actions/postsActions";
import AddTags from "./AddTags";

const PostPage = (props) => {
  const dispatch = useDispatch();
  const postId = props.history.location.state.postId;
  const post = useSelector((state) => state.posts.selectedPost);

  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
    dispatch(fetchPostById(postId));
  }, []);

  const dispatchAddTagAction = (newTag) => {
    const updatedPost = {
      ...post,
      tags: [...post.tags, newTag],
    };
    dispatch(addNewTagToPost(updatedPost));
  };

  const addTagToPost = (selectedTag) => {
    dispatchAddTagAction(JSON.parse(selectedTag));
  };

  const createTag = (newTagName) => {
    const newTag = { id: uuidv4(), name: newTagName };
    dispatch(createNewTag(newTag));
    dispatchAddTagAction(newTag);
  };

  return (
    <div className="postPageDiv">
      <h3>{post.title}</h3>
      <p>tags: {post.tags.map((tag) => tag.name + " ")} </p>
      <AddTags addTagToPost={addTagToPost} createTag={createTag}></AddTags>
      <p className="postPageExcerpt">{post.excerpt}</p>

      {post.authors.map((author) => (
        <React.Fragment>
          <img className="authorImage" src={author.profile_image}></img>
          {author.name}
        </React.Fragment>
      ))}
      <p>{moment(post.published_at).format("LLL")}</p>
      <p>reading time: {post.reading_time} min</p>
      <p>
        <img className="postPageImage" src={post.feature_image}></img>
      </p>
    </div>
  );
};

export default PostPage;
