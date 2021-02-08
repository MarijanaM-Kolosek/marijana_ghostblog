import * as actionTypes from "./types";

export const fetchTags = () => {
  return (dispatch) => {
    fetch(
      `https://demo.ghost.io/ghost/api/v3/content/tags/?key=22444f78447824223cefc48062&include=count.posts`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: actionTypes.FETCH_TAGS, payload: data.tags });
      });
  };
};
