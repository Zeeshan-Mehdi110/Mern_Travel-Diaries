const express = require("express")
const Post = require("../models/Post")
const User = require("../models/User")
const router = express.Router()
const { v2 } = require('cloudinary');
const multer = require('multer')
const path = require("path")
const fs = require('fs');

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create the temp directory if it doesn't exist
const tempDirectory = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDirectory)) {
  fs.mkdirSync(tempDirectory);
}

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
    console.log(req.body)
    const { title, description, location, date } = req.body
    // Save the buffer to a temporary file
    const tempFilePath = path.join(__dirname, '../temp', req.file.originalname);
    fs.writeFileSync(tempFilePath, req.file.buffer);
    const imageUrl = await v2.uploader.upload(tempFilePath)
    console.log(imageUrl)
    // Delete the temporary file
    fs.unlinkSync(tempFilePath);
    const post = new Post({
      title,
      description,
      image: imageUrl.url,
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
    // Save the buffer to a temporary file
    const tempFilePath = path.join(__dirname, '../temp', req.file.originalname);
    fs.writeFileSync(tempFilePath, req.file.buffer);
    const imageUrl = await v2.uploader.upload(tempFilePath)
    console.log(imageUrl)
    // Delete the temporary file
    fs.unlinkSync(tempFilePath);

    const record = {
      title,
      description,
      image: imageUrl.secure_url,
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