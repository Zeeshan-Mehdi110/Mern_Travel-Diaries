import { authActionsTypes } from "../actions/authActions"

const initState = {
  isLoggedIn: false,
  user: null,
  token: null,
  error: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authActionsTypes.SIGNUP : 
      return {
        ...state,
        isLoggedIn : true,
        user : action.user
      }
    case authActionsTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        user: action.user
      }
    case authActionsTypes.LOGOUT:
      return initState
    case authActionsTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.error,
        isLoggedIn: false,
        user: null,
        token: null
      }
    default:
      return state
  }
}

export default authReducer
