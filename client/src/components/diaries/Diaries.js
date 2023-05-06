import { Box } from "@mui/material"
import DiaryItem from "./DiaryItem"
import { useEffect } from "react"
import { loadStudents } from "../../store/actions/studentsAction"
import { connect} from 'react-redux'


const Diaries = ({posts,dispatch}) => {
  useEffect(()=> {
    dispatch(loadStudents())
  },[])
  return (
    <Box display={"flex"} flexDirection={"column"} p={3} justifyContent={"center"} alignItems={"center"} >
      {" "}
      {
        posts.map((post) => (
          <DiaryItem key={post._id} 
          title={post.title} 
          description={post.description}
          image = {post.image} 
          location = {post.location}
          date = {new Date(`${post.date}`).toLocaleDateString()}
          postId = {post._id}
          user = {post.user._id}
          name = {post.user.name}
          />
        ))
      }
    </Box>
  )
}
const mapStateToProps = (state) => {
  return {
    posts : state.posts.posts
  }
}
const wrapper = connect(mapStateToProps)
export default wrapper(Diaries)
