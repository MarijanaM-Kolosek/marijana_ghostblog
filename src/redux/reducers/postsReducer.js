import * as actionTypes from "../actions/types";

const initialState = {
  selectedPost: {
    id: "",
    title: "",
    feature_image: "",
    published_at: "",
    authors: [],
    tags: [],
    excerpt: "",
    reading_time: 0,
  },
  posts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_POSTS:
      return { ...state, posts: action.payload };
    case actionTypes.FETCH_POST_BY_ID:
      return { ...state, selectedPost: action.payload };
    case actionTypes.ADD_NEW_TAG_TO_POST:
      return { ...state, selectedPost: action.payload };
    default:
      return state;
  }
}
