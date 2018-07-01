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
  user: {},
  isAuthed: false
};

//reducer
export default function userReducer(state = initialState, action) {
  // console.log(action.type, action.payload);
  switch (action.type) {
    case `${GET_USER}_FULFILLED`:
      return {
        ...state,
        user: action.payload.data,
        isAuthed: true
      };
    case `${GET_USER}_REJECTED`:
      return {
        ...state,
        isAuthed: false
      };
    default:
      return state;
  }
}
