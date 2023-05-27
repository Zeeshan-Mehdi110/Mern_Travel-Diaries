const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createJWTToken } = require("../utils/util");
const { verifyUser } = require("../middlewares/userAuth");
const { randomBytes } = require("crypto");
const router = express.Router();
const ejs = require("ejs");
const nodemailer = require("nodemailer");

router.use(["/profile"], verifyUser);

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    if (users) res.status(200).json({ users });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("posts");
    if (user) res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
router.post("/signup", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) throw new Error("There is already a user with this email");
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    });
    await user.save();

    // Generate JWT token for the User
    const token = await createJWTToken(user, 12);

    user = user.toObject();
    delete user.password;

    res.json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    // Check if a User with the given email exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("invalid request");

    // Compare the provided password with the stored hashed password
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) throw new Error("invalid request");

    // Generate JWT token for the User
    const token = await createJWTToken(user, 12);

    user = user.toObject();
    delete user.password;

    // Return the User object and JWT token
    res.json({
      user,
      token,
    });
  } catch (err) {
    // Handle errors
    res.status(400).json({ error: err.message });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    if (!req.body.email) throw new Error("Email is required");
    let user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error("invalid request");
    const code =
      user._id.toString() +
      randomBytes(Math.ceil(25 / 2))
        .toString("hex")
        .slice(0, 25);
    await User.findByIdAndUpdate(user._id, { passwordResetCode: code });
    const resetPasswordURL =
      "http://localhost:3000/" + "reset-password/" + code;
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "wyman.wilkinson@ethereal.email",
        pass: "u71DG5cwqKefsTjPCa",
      },
    });

    const htmlContent = await ejs.renderFile("./emails/resetPassword.ejs", {
      name: user.name,
      resetPasswordURL,
    });

    const info = await transporter.sendMail({
      from: `"Zeeshan Mehdi"<zeeshanmehdi512@gmail.com>`,
      to: `zeeshanmehdi253@gmail.com`,
      subject: "Reset Password",
      html: htmlContent,
    });
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    if (!req.body.code) throw new Error("Code is required");
    if (!req.body.newPassword) throw new Error("New password is required");
    if (!req.body.confirmPassword)
      throw new Error("Confirm password is required");
    if (req.body.newPassword.length < 6)
      throw new Error("Password should have at least 6 characters");

    if (req.body.newPassword !== req.body.confirmPassword)
      throw new Error("Passwords are not same");

    let user = await User.findOne({ passwordResetCode: req.body.code });
    if (!user) throw new Error("Invalid request");
    await User.findByIdAndUpdate(user._id, {
      password: await bcrypt.hash(req.body.newPassword, 10),
      passwordResetCode: "",
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
