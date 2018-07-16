import axios from "axios";

//constants
const GET_FAVORITES = "GET_FAVORITES";
const ADD_FAVORITE = "ADD_FAVORITE";

//action creators
export function getFavorites(id) {
  return {
    type: GET_FAVORITES,
    payload: axios.get(`/api/favorites/${id}`)
  };
}

export function addFavorite(
  image_url,
  owner_post_id,
  property_title,
  beds,
  baths,
  description,
  price,
  address,
  city,
  round,
  owner_name,
  owner_avatar,
  user_id
) {
  return {
    type: ADD_FAVORITE,
    payload: axios.post("/api/favorite", {
      image_url,
      owner_post_id,
      property_title,
      beds,
      baths,
      description,
      price,
      address,
      city,
      round,
      owner_name,
      owner_avatar,
      user_id
    })
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
        // favorites: action.payload.data
      };
    case `${ADD_FAVORITE}_PENDING`:
      return {
        ...state,
        isLoading: true
      };
    case `${ADD_FAVORITE}_FULFILLED`:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
