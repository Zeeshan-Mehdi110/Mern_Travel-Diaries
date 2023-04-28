import axios from "axios"

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