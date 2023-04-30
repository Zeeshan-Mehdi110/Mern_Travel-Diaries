const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const router = express.Router()

router.get("/",async (req,res) => {
  try {
    const users = await User.find()
    if(users)
    res.status(200).json({users})
  } catch (err) {
    res.status(400).json({"error":err.message})
  }
})
router.get("/:id",async (req,res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id).populate("posts")
    if(user)
    res.status(200).json({user})
  } catch (err) {
    res.status(400).json({"error":err.message})
  }
})

router.post('/signup', async (req, res) => {
try {
  const userExist = await User.findOne({email : req.body.email})
  if(userExist)
    throw new Error("There is already a user with this email")
  const user = new User({
    name : req.body.name,
    email : req.body.email,
    password : await bcrypt.hash(req.body.password,10)
  })
  await user.save()
  res.json({
    user
  })
} catch (error) {
  res.status(400).json({"error":error.message})
}
})
router.post('/login', async (req, res) => {
  try {
    // Check if a User with the given email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      throw new Error("invalid request")

    // Compare the provided password with the stored hashed password
    const comparePassword = await bcrypt.compare(req.body.password, user.password)
    if (!comparePassword)
      throw new Error("invalid request")

    // Generate JWT token for the User

    // Return the User object and JWT token
    res.json({
      user
    })
  } catch (err) {
    // Handle errors
    res.status(400).json({ "error": err.message })
  }
})
module.exports = router