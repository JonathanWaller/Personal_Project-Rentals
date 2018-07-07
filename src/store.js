import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";
//not sure yet about below reducer
import propertyReducer from "./ducks/propertyReducer";
import locationReducer from "./ducks/locationReducer";

const combinedReducers = combineReducers({
  user: userReducer,
  properties: propertyReducer,
  location: locationReducer
});

const store = createStore(
  combinedReducers,
  applyMiddleware(promiseMiddleware())
);

export default store;
