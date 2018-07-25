import axios from "axios";

// Constants
const GET_PROPERTIES = "GET_PROPERTIES";
const GET_PROPERTY = "GET_PROPERTY";

// Action Creator
export function getProperties() {
  return {
    type: GET_PROPERTIES,
    payload: axios.get("/api/properties")
  };
}

export function getProperty(id) {
  return {
    type: GET_PROPERTY,
    payload: axios.get(`/api/property/${id}`)
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
    case `${GET_PROPERTY}_PENDING`:
      return {
        ...state,
        isloading: true
      };
    case `${GET_PROPERTY}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        properties: action.payload.data
      };
    default:
      return state;
  }
}
