import React, { useState, useEffect } from "react";
import * as moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { authService } from "../services/auth.service";
import { fetchTags, createNewTag } from "../redux/actions/tagsActions";
import { addNewTagToPost, fetchPostById } from "../redux/actions/postsActions";

const PostPage = (props) => {
  const dispatch = useDispatch();
  const postId = props.history.location.state.postId;
  const tags = useSelector((state) => state.tags.tags);
  const post = useSelector((state) => state.posts.selectedPost);
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [newTagName, setNewTagName] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    if (!authService.currentUserValue) {
      props.history.push("/login");
    }
    dispatch(fetchPostById(postId));
    dispatch(fetchTags());
  }, []);

  const toggleCreateNewTag = (e) => {
    setShowCreateTag(!showCreateTag);
  };

  const dispatchAddTagAction = (newTag) => {
    const updatedPost = {
      ...post,
      tags: [...post.tags, newTag],
    };
    dispatch(addNewTagToPost(updatedPost));
  };

  const addTagToPost = (e) => {
    dispatchAddTagAction(JSON.parse(selectedTag));
  };

  const createTag = (e) => {
    const newTag = { id: uuidv4(), name: newTagName };
    dispatch(createNewTag(newTag));
    dispatchAddTagAction(newTag);
  };

  return (
    <div className="postPageDiv">
      <h3>{post.title}</h3>
      <p>tags: {post.tags.map((tag) => tag.name + " ")} </p>
      <div className={!showCreateTag ? "createNewTagDiv" : "hideDiv"}>
        <select
          className="filtersSelectInput"
          name="selectTagFilter"
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">Choose tag</option>
          {tags.map((tag) => (
            <option value={JSON.stringify(tag)}>{tag.name}</option>
          ))}
        </select>
        <button className="createTagButtons" onClick={(e) => addTagToPost(e)}>
          add
        </button>
        <button
          className="createTagButtons"
          onClick={(e) => toggleCreateNewTag(e)}
        >
          create new tag
        </button>
      </div>
      <div className={showCreateTag ? "createNewTagDiv" : "hideDiv"}>
        <input
          className="regularInput"
          type="text"
          name="newTagName"
          onChange={(e) => setNewTagName(e.target.value)}
          placeholder="new tag name"
        />
        <button className="createTagButtons" onClick={(e) => createTag(e)}>
          create & add
        </button>
        <button
          className="createTagButtons"
          onClick={(e) => toggleCreateNewTag(e)}
        >
          X
        </button>
      </div>
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
