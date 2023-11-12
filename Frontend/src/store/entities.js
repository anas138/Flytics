import { combineReducers } from "redux";
import staffReducer from "./staff/staff";
import AlertReducer from "./alerts/alerts";
import OperatorReducer from "./operators/operators";
import ImageReducer from "./imageUpload/imageUpload";
import DepartmentReducer from "./departments/departments";

export default combineReducers({
  staff: staffReducer,
  alert: AlertReducer,
  operator: OperatorReducer,
  image: ImageReducer,
  department: DepartmentReducer,
});
