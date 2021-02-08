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
