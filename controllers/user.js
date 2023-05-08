const express = require("express")
const User = require("../models/User")
const bcrypt = require("bcrypt")
const { createJWTToken } = require("../utils/util")
const { verifyUser } = require("../middlewares/userAuth")
const router = express.Router()

router.use( ["/profile"] , verifyUser )

router.get("/",async (req,res) => {
  try {
    const users = await User.find()
    if(users)
    res.status(200).json({users})
  } catch (err) {
    res.status(400).json({"error":err.message})
  }
})
router.get("/profile",async (req,res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts")
    if(user)
    res.status(200).json({user})
  } catch (err) {
    res.status(400).json({ error : err.message })
  }
})

router.post('/signup', async (req, res) => {
try {
  const userExist = await User.findOne({email : req.body.email})
  if(userExist)
    throw new Error("There is already a user with this email")
  let user = new User({
    name : req.body.name,
    email : req.body.email,
    password : await bcrypt.hash(req.body.password,10)
  })
  await user.save()

  const token = await createJWTToken(user,12)

  user = user.toObject()
  delete user.password

  res.json({
    user,
    token
  })
} catch (error) {
  res.status(400).json({"error":error.message})
}
})
router.post('/login', async (req, res) => {
  try {
    // Check if a User with the given email exists
    let user = await User.findOne({ email: req.body.email });
    if (!user)
      throw new Error("invalid request")

    // Compare the provided password with the stored hashed password
    const comparePassword = await bcrypt.compare(req.body.password, user.password)
    if (!comparePassword)
      throw new Error("invalid request")

    // Generate JWT token for the User
    const token = await createJWTToken(user,12)

    user = user.toObject()
    delete user.password

    // Return the User object and JWT token
    res.json({
      user,
      token
    })
  } catch (err) {
    // Handle errors
    res.status(400).json({ "error": err.message })
  }
})

module.exports = router