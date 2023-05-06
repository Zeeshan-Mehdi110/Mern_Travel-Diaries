import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";

const allReducers = {
  posts: postsReducer,
  auth: authReducer,
}
export const rootReducer = combineReducers(allReducers)