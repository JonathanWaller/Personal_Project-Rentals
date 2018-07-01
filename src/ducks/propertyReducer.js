import axios from "axios";

// Constants
const GET_PROPERTIES = "GET_PROPERTIES";

// Action Creator
export function getProperties() {
  return {
    type: GET_PROPERTIES,
    payload: axios.get("/api/properties")
  };
}

// Initial State
const initialState = {
  properties: [],
  isLoading: false
  //using above isLoading for the below reducer function. used in case you're accessing lots of data and it takes some time to return
};

//  reducer
export default function propertyReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_PROPERTIES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_PROPERTIES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        properties: action.payload.data
      };
    default:
      return state;
  }
}
