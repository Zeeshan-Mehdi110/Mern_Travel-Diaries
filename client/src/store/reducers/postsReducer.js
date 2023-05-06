import { usersActionTypes } from "../actions/postActions"

const initState = {
  posts: [],
  loading: false,
  error: null
}
const postsReducer = (state = initState, action) => {
  switch (action.type) {
    case usersActionTypes.LOADING_POSTS:
      return {
        ...state,
        loading: true,
        error: null
      }
    case usersActionTypes.LOADED_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.posts,
        error: null
      }
    case usersActionTypes.ERROR_OCCURE:
      return {
        ...state,
        loading: false,
        error: true,
      }
    default:
      return state
  }
}
export default postsReducer