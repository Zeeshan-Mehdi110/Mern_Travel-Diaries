import { Route, Routes } from "react-router-dom";
import MiniDrawer from "./components/form/MiniDrawer";
import SignUp from "./components/form/SignUp";
import StudentsData from "./components/students/StudentsData";
import Login from "./components/form/Login";
import LogOut from "./components/form/LogOut";
import EditStudent from "./components/form/EditStudent";
import Home from "./components/home/Home";
import Diaries from "./components/diaries/Diaries";
import Profile from "./components/profile/Profile";
import AddPost from "./components/posts/AddPost";


const AppRoutes = () => {
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
      path : "/add",
      element : AddPost
    },
    {
      path : "/profile",
      element : Profile,
    },
    {
      path : "/signUp",
      element : SignUp,
    },
    {
      path : "/login",
      element : Login,
    },
    {
      path : "/logOut",
      element : LogOut,
    },
    {
      path : "/edit/:id",
      element : EditStudent,
    },
  ]
  return (
    <div>
        <Routes>
          <Route path="/" element={<MiniDrawer />} >
          {
            routes.map((route,index) => {
              return <Route key={index} path={route.path} element={<route.element />} />
            })
          }
          </Route>
        </Routes>
    </div>
  )
}

export default AppRoutes


