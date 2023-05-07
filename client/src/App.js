import { useDispatch } from "react-redux";
import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import { authActionsTypes } from "./store/actions/authActions";
import { loadPosts } from "./store/actions/postActions";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token)
    dispatch({ type : authActionsTypes.LOAD_TOKEN , token : token })
  },[])

  useEffect(() => {
    dispatch(loadPosts())
  },[])
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;