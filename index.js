require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const userController = require("./controllers/user")
const postController = require("./controllers/post")
const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json())
app.use("/api/user",userController)
app.use("/api/user/post",postController)

mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(()=> {
  console.log("database connected successfully")
})


app.listen(5000,() => console.log("app is listening at port 5000"))