import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";
import progressBarReducer from "./progressBarReducer";

const allReducers = {
  posts: postsReducer,
  auth: authReducer,
  progressBar : progressBarReducer
}
export const rootReducer = combineReducers(allReducers)