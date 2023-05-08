
export const authActionsTypes = {
  LOGIN : "login",
  SIGNUP : "signup",
  LOGOUT : "logout",
  SET_USER : "setUser",
  AUTH_ERROR : "auth_error",
  LOAD_TOKEN : "load-token",
}

export const setUserInRedux = (user) => ({ type : authActionsTypes.SET_USER, user })

