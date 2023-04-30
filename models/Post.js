const mongoose = require("mongoose");
const moment = require("moment")

const postSchema = new mongoose.Schema({
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
postSchema.set('toJSON', {
  getters: true,
  transform: (doc, ret, options) => {
    ret.created_on = moment(ret.created_on).format('YYYY-MM-DD');
    ret.modified_on = moment(ret.modified_on).format('YYYY-MM-DD');
    return ret;
  }
});

const Post = mongoose.model("Post",postSchema)

module.exports = Post