import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import DiaryItem from "../diaries/DiaryItem";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails } from "../../store/actions/postActions";
import { authActionsTypes, setUserInRedux } from "../../store/actions/authActions";
const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserDetails()
      .then((data) => {
        setUser(data.user)
        dispatch(setUserInRedux(data.user))
      })
      .catch((err) => console.log(err));
  }, []);
  const handleClick = () => {
    dispatch({ type : authActionsTypes.LOGOUT })
    navigate("/")
  };
  const images = [
    "https://cdn.pixabay.com/photo/2016/01/09/18/27/camera-1130731_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/08/06/12/06/people-2591874_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/10/23/05/56/summer-2880261_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/01/28/02/24/japan-2014618_960_720.jpg",
    "https://cdn.pixabay.com/photo/2012/08/06/00/53/bridge-53769_960_720.jpg",
  ]
  return (
    <Box display="flex" flexDirection={"column"}>
      {user && (
        <>
          {" "}
          <Typography
            textAlign={"center"}
            variant="h3"
            fontFamily={"quicksand"}
            padding={2}
          >
            User Profile
          </Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign="left">
            <b>Name </b>: {user.name}
          </Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign="left">
            <b>Email </b>: {user.email}
          </Typography>
          <Button
            onClick={handleClick}
            sx={{ mr: "auto", width: "15%", mt:"10px" }}
            color="warning"
            variant="contained"
          >
            Logout
          </Button>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
          >
            {
            user.posts.length > 0 ?
            user.posts.map((post, index) => (
              <DiaryItem
                key={index}
                title={post.title}
                date={post.modified_on}
                description={post.description}
                postId={post._id}
                image={images[index % images.length]}
                location={post.location}
                user={user._id}
                name={user.name}
              />
            )) :         <Box width={"100%"} height={"30%"} pt={"16px"} >
            <Typography textAlign={"center"} fontFamily={"var(--dancing)"} variant="h4" >SHARE YOUR TRAVEL DIARIES WITH US</Typography>
            <Box margin={"auto"} textAlign={"center"} mt={2} >
              <Button LinkComponent={Link} to="/add" variant="outlined" sx={{"marginRight":2}} >Share Your Story</Button>
              <Button LinkComponent={Link} to="/diaries" variant="contained">View Diaries</Button>
            </Box>
          </Box>
            }
          </Box>{" "}
        </>
      )}
    </Box>
  );
};

export default Profile;