//constants
const UPDATE_RATING = "UPDATE_RATING";
//action creators
export function updateRating(rating) {
  return {
    type: UPDATE_RATING,
    payload: rating
  };
}
//initial state
const initialState = {
  rating: 0
};
//reducer
export default function ratingReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_RATING:
      return {
        ...state,
        rating: action.payload
      };
    default:
      return state;
  }
}
