import axios from "axios"
import { authActionsTypes } from "../store/actions/authActions"


const configureAxios = (store) => {
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
  axios.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
      const state = store.getState()
      if (state?.auth?.token)
        config.headers.Authorization = "Bearer " + state.auth.token;
    }
    return config
  }, error => Promise.reject(error))
  // response 
  axios.interceptors.response.use(response => response, err => {
    if (err.response && err.response.status === 400) {
      store.dispatch({
        type: authActionsTypes.AUTH_ERROR
      })
      localStorage.removeItem("token")
      return Promise.reject(new Error("Authentication Failed"))
    } else {
      return Promise.reject(err)
    }
  })
}

export default configureAxios