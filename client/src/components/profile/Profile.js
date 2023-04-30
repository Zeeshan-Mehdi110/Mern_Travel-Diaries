import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import DiaryItem from "../diaries/DiaryItem";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../store/actions/postActions";
import { authActionsTypes } from "../../store/actions/authActions";
const Profile = () => {
  const id = useSelector(state => state?.auth?.student?._id)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  useEffect(() => {
    getUserDetails(id)
      .then((data) => {
        setUser(data.user)
      })
      .catch((err) => console.log(err));
  }, []);
  const handleClick = () => {
    dispatch({ type : authActionsTypes.LOGOUT })
    navigate("/")
  };
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
            Name: {user.name}
          </Typography>
          <Typography fontFamily={"quicksand"} padding={1} textAlign="left">
            Email: {user.email}
          </Typography>
          <Button
            onClick={handleClick}
            sx={{ mr: "auto", width: "15%" }}
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
            {user.posts.map((post, index) => (
              <DiaryItem
                key={index}
                title={post.title}
                date={post.modified_on}
                description={post.description}
                postId={post._id}
                image={post.image}
                location={post.location}
                user={user._id}
                name={user.name}
              />
            ))}
          </Box>{" "}
        </>
      )}
    </Box>
  );
};

export default Profile;