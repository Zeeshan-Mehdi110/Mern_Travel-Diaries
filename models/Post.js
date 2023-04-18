const mongoose = require("mongoose");

const Post = new mongoose.model("Post",{
  title : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  image : {
    type : String,
    required : true,
  },
  location : {
    type : String,
    required : true,
  },
  date : {
    type : Date,
    required : true,
  },
  // every post has a single User
  user : {
    type : mongoose.Types.ObjectId,
    ref : "User",
  }
})

module.exports = Post