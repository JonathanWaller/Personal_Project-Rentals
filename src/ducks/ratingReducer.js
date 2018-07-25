import axios from "axios";

//constants
const GET_AVGRATING = "GET_AVGRATING";

//action creators
export function getAvgRating() {
  return {
    type: GET_AVGRATING,
    payload: axios.get(`/api/rating`)
  };
}
//initial state
const initialState = {
  avgRating: []
};
//reducer
export default function ratingReducer(state = initialState, action) {
  // console.log("action payload", action.payload);
  // console.log("action type!  ", action.type);
  switch (action.type) {
    case `${GET_AVGRATING}_FULFILLED`:
      return {
        ...state,
        avgRating: action.payload.data
      };
    default:
      return state;
  }
}
