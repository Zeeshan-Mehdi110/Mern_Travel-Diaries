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
    res.status(500).json({"error":err.message})
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
    password : await bcrypt.hash(req.body.password,10),
    posts : req.body.post,
    
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
    const UserExist = await User.findOne({ email: req.body.email });
    if (!UserExist)
      throw new Error("invalid request")

    // Compare the provided password with the stored hashed password
    const comparePassword = await bcrypt.compare(req.body.password, UserExist.password)
    if (!comparePassword)
      throw new Error("invalid request")

    // Generate JWT token for the User

    // Return the User object and JWT token
    res.json({
      UserExist
    })
  } catch (err) {
    // Handle errors
    res.json({ "error": err.message })
  }
})
module.exports = router