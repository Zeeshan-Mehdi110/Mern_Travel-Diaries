import axios from "axios"

export const usersActionTypes = {
  LOADING_POSTS : 'loading posts',
  LOADED_POSTS : 'loaded posts',
  ERROR_OCCURE    : 'error',
}

export const loadPosts = () => {
  return (dispatch) => {
          dispatch({ type : usersActionTypes.LOADING_POSTS })
          axios.get('http://localhost:5000/api/user/post/load').then(result => {
              dispatch({ type : usersActionTypes.LOADED_POSTS , posts : result.data.post })
          }).catch(err => {
              console.log(err)
              dispatch({ type : usersActionTypes.ERROR_OCCURE , error : err.message })
          })
  }
}

export const getPostDetails = async (id) => {
  const res =  await axios.get(`http://localhost:5000/api/user/post/${id}`) 
  if (res.status !== 200){
    console.log("Unable to fetch Data")
  }  
  const resData = await res.data
  return resData
}

export const deletePost = async (id) => {
  const res =  await axios.delete(`http://localhost:5000/api/user/post/delete/${id}`) 
  if (res.status !== 200){
    console.log("Unable to Delete")
  }  
  const resData = await res.data
  return resData
}

export const getUserDetails = async (id) => {
  const res = await axios.get(`http://localhost:5000/api/user/${id}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No user found");
  }

  const resData = await res.data;
  return resData;
};