import * as actionTypes from "./types";

export const fetchAuthors = () => {
  return (dispatch) => {
    fetch(
      `https://demo.ghost.io/ghost/api/v3/content/authors/?key=22444f78447824223cefc48062&include=count.posts`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: actionTypes.FETCH_AUTHORS, payload: data.authors });
      });
  };
};
