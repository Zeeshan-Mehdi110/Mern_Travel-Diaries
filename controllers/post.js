const express  = require("express")
const Post = require("../models/Post")
const User = require("../models/User")
const router = express.Router()

router.get("/load",async (req,res) => {
  try {
    const post = await Post.find().populate("user")
    if(post)
    console.log(post)
    res.json({post})
  } catch (err) {
    res.status(400).json({"error":err.message})
  }
} )
router.get("/:id",async (req,res) => {
  try {
    const id = req.params.id
    const post = await Post.findById(id)
    if(post)
    res.json({post})
  } catch (err) {
    res.status(400).json({"error":err.message})
  }
} )
router.post("/:id", async (req,res) => {
try {
  const existingUser = await User.findById(req.params.id)
  if(!existingUser)
    throw new Error("User not found")
  const post = new Post({
    title : req.body.title,
    description : req.body.description,
    image : req.body.image,
    location : req.body.location,
    date : req.body.date,
    user : req.params.id,
  })
  existingUser.posts.push(post._id)
  await Promise.all([post.save(),existingUser.save()])
  res.json({post})
} catch (err) {
  res.status(500).json({'error':err.message})
}
})
router.post("/update/:id", async (req,res) => {
  try {
    const id = req.params.id
    const post = await Post.findByIdAndUpdate(id,req.body)
    if(!post)
    throw new Error("Unable to update")
    res.json("Updated Successfully")
  } catch (err) {
    res.status(500).json({"error":err.message})
  }
})
router.delete("/delete/:id", async (req,res) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)
    if(!post)
      throw new Error("Post not Found")
    const user = await User.findById(post.user.toString())
    if(!user)
      throw new Error("User not found")
      // Remove the post ID from the user's posts array
      await user.posts.pull(postId);
      // const post = await Post.findByIdAndDelete(postId)
      // await Promise.all([post.delete(), user.save()]);
      await user.save();
      await Post.findByIdAndDelete(postId)
      
    res.json("Deleted Successfully!!")
  } catch (err) {
    res.status(500).json({"error":err.message})
  }
})

module.exports = router