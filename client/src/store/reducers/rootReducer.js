import { combineReducers } from "redux";
import studentReducer from "./studentReducer";
import authReducer from "./authReducer";

const allReducers = {
  students: studentReducer,
  auth: authReducer,
}
export const rootReducer = combineReducers(allReducers)