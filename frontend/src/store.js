// imports
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import reducers from "./reducers";

// middleware for dealing with functions as actions and debugging
let middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware = [...middleware, logger];
}

middleware = applyMiddleware(...middleware);

// create store
const store = createStore(reducers, middleware);

// exports
export default store;
