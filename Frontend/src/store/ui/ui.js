import { combineReducers } from "redux";
import drawerReducer from "./drawer";
import errorReducer from "./error";
import filtersReducer from "./filters/filters";

export default combineReducers({
  filters: filtersReducer,
  drawer: drawerReducer,
  error: errorReducer,
});
