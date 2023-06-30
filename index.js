require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userController = require("./controllers/user")
const postController = require("./controllers/post")
const app = express();

app.use(cors())

app.use(express.json())
app.use(express.static(__dirname + `/client/build`))
app.use("/api/user", userController)
app.use("/api/user/post", postController)

mongoose.connect(process.env.MONGODB_CONNECTION_URL).then(() => {
  console.log("database connected successfully")
})

app.all("*", (req, res) => {
  res.sendFile(__dirname + `/client/build/index.html`)
})

app.use((err, req, res, next) => {
  if (err) res.status(400).json({ error: err.message })
  else next()
})

app.listen(5000, () => {
  console.log(`App listening at Port 5000`);
});
