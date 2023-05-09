import { useDispatch } from "react-redux";
import AppRoutes from "./AppRoutes";
import { useEffect } from "react";
import { authActionsTypes, setUserInRedux } from "./store/actions/authActions";
import { getUserDetails, loadPosts } from "./store/actions/postActions";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
    getUserDetails()
    .then((data) => {
      dispatch(setUserInRedux(data.user))
    })
    .catch((err) => console.log(err));
      dispatch({ type : authActionsTypes.LOAD_TOKEN , token : token })
    }
  },[])
  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;