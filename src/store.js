import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";
import propertyReducer from "./ducks/propertyReducer";
import locationReducer from "./ducks/locationReducer";
import reviewReducer from "./ducks/reviewReducer";
import ratingReducer from "./ducks/ratingReducer";
import favoritesReducer from "./ducks/favoritesReducer";

const combinedReducers = combineReducers({
  user: userReducer,
  properties: propertyReducer,
  location: locationReducer,
  reviews: reviewReducer,
  rating: ratingReducer,
  favorites: favoritesReducer
});

const store = createStore(
  combinedReducers,
  applyMiddleware(promiseMiddleware())
);

export default store;
