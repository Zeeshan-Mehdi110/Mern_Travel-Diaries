import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";
import progressBarReducer from "./progressBarReducer";
import alertReducer from "./alertReducer";

const allReducers = {
  posts: postsReducer,
  auth: authReducer,
  progressBar: progressBarReducer,
  alert: alertReducer,
};
export const rootReducer = combineReducers(allReducers);
