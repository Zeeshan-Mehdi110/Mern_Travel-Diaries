import { Route, Routes } from "react-router-dom";
import MiniDrawer from "./components/form/MiniDrawer";
import SignUp from "./components/form/SignUp";
import Login from "./components/form/Login";
import Home from "./components/home/Home";
import Diaries from "./components/diaries/Diaries";
import Profile from "./components/profile/Profile";
import AddPost from "./components/posts/AddPost";
import DiaryUpdate from "./components/diaries/DiaryUpdate";
import { useSelector } from "react-redux";


const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const routes = [
    {
      path : "/",
      element : Home,
    },
    {
      path : "/diaries",
      element : Diaries
    },
    {
      path : "/signUp",
      element : SignUp,
    },
    {
      path : "/login",
      element : Login,
    },
  ]
  const loggedInRoutes = [
    {
      path : "/add",
      element : AddPost
    },
    {
      path : "/post/:id",
      element : DiaryUpdate
    },
    {
      path : "/profile",
      element : Profile,
    },
    {
      path : "/",
      element : Home,
    },
    {
      path : "/diaries",
      element : Diaries
    },
    {
      path : "/signUp",
      element : SignUp,
    },
    {
      path : "/login",
      element : Login,
    }
  ]
  return (
    <div>
        <Routes>
          <Route path="/" element={<MiniDrawer />} >
          {
            isLoggedIn ? loggedInRoutes.map((route,index) => {
              return <Route key={index} path={route.path} element={<route.element />} />
            }) : routes.map((route,index) => {
              return <Route key={index} path={route.path} element={<route.element />} />
            })
          }
          </Route>
        </Routes>
    </div>
  )
}

export default AppRoutes


