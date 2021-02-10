import * as actionTypes from "./types";

export const fetchPosts = () => {
  return (dispatch) => {
    fetch(
      `https://demo.ghost.io/ghost/api/v3/content/posts/?key=22444f78447824223cefc48062&include=authors,tags`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: actionTypes.FETCH_POSTS, payload: data.posts });
      });
  };
};

export const fetchPostById = (id) => {
  return (dispatch) => {
    fetch(
      `https://demo.ghost.io/ghost/api/v3/content/posts/${id}/?key=22444f78447824223cefc48062&include=authors,tags`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: actionTypes.FETCH_POST_BY_ID,
          payload: data.posts[0],
        });
      });
  };
};

export const addNewTagToPost = (payload) => {
  return { type: actionTypes.ADD_NEW_TAG_TO_POST, payload: payload };
};
