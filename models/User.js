const mongoose = require("mongoose");

const User = mongoose.model("User", {
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  passwordResetCode: {
    type: String,
  },
  user: {
    type: String,
  },
  // user can have multiple posts which can be an array of posts
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post" }],
});

module.exports = User;
