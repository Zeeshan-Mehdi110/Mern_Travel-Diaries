const express = require("express")
const Post = require("../models/Post")
const User = require("../models/User")
const router = express.Router()
const { v2 } = require('cloudinary');
const upload = require("../utils/multer")



v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

router.get("/load", async (req, res) => {
  try {
    const post = await Post.find().populate("user")
    if (post)
      res.json({ post })
  } catch (err) {
    res.status(400).json({ "error": err.message })
  }
})
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id
    const post = await Post.findById(id)
    if (post)
      res.json({ post })
  } catch (err) {
    res.status(400).json({ "error": err.message })
  }
})
router.post("/:id", upload.single("image"), async (req, res) => {
  try {
    const existingUser = await User.findById(req.params.id)
    if (!existingUser)
      throw new Error("User not found")
    const { title, description, location, date } = req.body
    // Upload image to cloudinary
    const imageUrl = await v2.uploader.upload(req.file.path);
    const post = new Post({
      title,
      description,
      image: imageUrl.secure_url,
      cloudinary_id: imageUrl.public_id,
      location,
      date,
      user: req.params.id,
    })
    existingUser.posts.push(post._id)
    await Promise.all([post.save(), existingUser.save()])
    res.json({ post })
  } catch (err) {
    res.status(500).json({ 'error': err.message })
  }
})
router.post("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id
    const { title, description, location, date } = req.body
    const prevPost = await Post.findById(id)
    // Delete image from cloudinary
    await v2.uploader.destroy(prevPost.cloudinary_id);
    // Upload new image to cloudinary
    const imageUrl = await v2.uploader.upload(req.file.path);
    console.log(imageUrl)
    const record = {
      title,
      description,
      image: imageUrl.secure_url,
      cloudinary_id: imageUrl.public_id,
      location,
      date,
      user: req.params.id,
    }
    const post = await Post.findByIdAndUpdate(id, record)
    if (!post)
      throw new Error("Unable to update")
    res.json("Updated Successfully")
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
})
router.delete("/delete/:id", async (req, res) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId)
    if (!post)
      throw new Error("Post not Found")
    // Delete image from cloudinary
    await v2.uploader.destroy(post.cloudinary_id);
    const user = await User.findById(post.user.toString())
    if (!user)
      throw new Error("User not found")
    // Remove the post ID from the user's posts array
    await user.posts.pull(postId);
    // const post = await Post.findByIdAndDelete(postId)
    // await Promise.all([post.delete(), user.save()]);
    await user.save();
    await Post.findByIdAndDelete(postId)

    res.json("Deleted Successfully!!")
  } catch (err) {
    res.status(500).json({ "error": err.message })
  }
})

module.exports = router