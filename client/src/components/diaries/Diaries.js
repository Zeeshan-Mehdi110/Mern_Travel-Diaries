import { Box, Typography } from "@mui/material";
import DiaryItem from "./DiaryItem";
import { useEffect } from "react";
import { connect } from "react-redux";
import { loadPosts } from "../../store/actions/postActions";

const Diaries = ({ posts, dispatch }) => {
  useEffect(() => {
    dispatch(loadPosts());
  }, []);
  return (
    <>
      <Typography
        textAlign="center"
        fontFamily="var(--dancing)"
        variant="h2"
        mt={{ xs: "18px", md: "28px" }}
        mb={{ xs: "12px", md: '0px' }}
        fontSize={{ xs: "28px", md: "42px" }}
      >
        SHARE YOUR TRAVEL DIARIES WITH US
      </Typography>
      <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        p={{ xs: "0px", md: 2 }}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        {" "}
        {posts.map((post, index) => (
          <DiaryItem
            key={post?._id}
            title={post.title}
            description={post.description}
            image={post.image}
            location={post.location}
            date={new Date(`${post.date}`).toLocaleDateString()}
            postId={post?._id}
            user={post.user?._id}
            name={post.user?.name}
          />
        ))}
      </Box>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    posts: state.posts.posts,
  };
};
const wrapper = connect(mapStateToProps);
export default wrapper(Diaries);
