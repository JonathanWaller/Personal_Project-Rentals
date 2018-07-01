import axios from "axios";

//constants
const GET_USER = "GET_USER";
//action creators
export function getUser() {
  return {
    type: GET_USER,
    payload: axios.get("/api/me")
  };
}
//initial state
const initialState = {
  user: {}
};

//reducer
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state
      };
    default:
      return state;
  }
}
