// imports
import { combineReducers } from "redux";
import { infoReducer } from "./info";

// export combined reducers
export default combineReducers({
  data: infoReducer
});
