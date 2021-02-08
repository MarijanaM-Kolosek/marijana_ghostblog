import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import tagsReducer from "./tagsReducer";
import authorsReducer from "./authorsReducer";

export default combineReducers({
  posts: postsReducer,
  tags: tagsReducer,
  authors: authorsReducer,
});
