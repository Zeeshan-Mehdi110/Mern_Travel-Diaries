import { authActionsTypes } from "../actions/authActions"

const initState = {
  isLoggedIn: false,
  student: null,
  token: null,
  error: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authActionsTypes.SIGNUP : 
      return {
        ...state,
        isLoggedIn : true,
        student : action.student,
        token : null,
        error : null
      }
    case authActionsTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        student: action.student,
        token: action.token,
        error: null
      }
    case authActionsTypes.LOGOUT:
      return initState
    case authActionsTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.error,
        isLoggedIn: false,
        student: null,
        token: null
      }
    default:
      return state
  }
}

export default authReducer
