import * as actionTypes from "../actions/types";

const initialState = { authors: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_AUTHORS:
      return { ...state, authors: action.payload };
    default:
      return state;
  }
}
