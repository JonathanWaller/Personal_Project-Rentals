import axios from "axios";

//constants
const GET_FAVORITES = "GET_FAVORITES";

//action creators
export function getFavorites(id) {
  return {
    type: GET_FAVORITES,
    payload: axios.get(`/api/favorites/${id}`)
  };
}

//intial state
const initialState = {
  favorites: [],
  isLoading: false
};

//reducer
export default function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_FAVORITES}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${GET_FAVORITES}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        properties: action.payload.data
      };
    default:
      return state;
  }
}
