const jwt = require("jsonwebtoken")
const User = require("../models/User")

// Define a middleware function called verifyUser
const verifyUser = async (req,res,next) => {
  try{
    // Throw an error if there is no Authorization header
    if(!req.headers.authorization)
      throw new Error("invalid request1")
    // Extract the token from the Authorization header
    const token = req.headers.authorization.slice(7)
    // Throw an error if there is no token
    if(!token)
    throw new Error("invalid request2")

    const decryptToken = new Promise((resolve,reject) => {
      jwt.verify(token,process.env.JWT_ENCRYPTION_KEY, async (err,decodedToken) => {
        if(err) reject(err)
        resolve(decodedToken)
      } )
    })
    const decodedToken = await decryptToken
    if(!decodedToken)
      throw new Error("invalid request")
      const user = await User.findById(decodedToken.uid);
    if(!user)
      throw new Error("invalid request")
    // if(user.status === 0)
    //   throw new Error("your account is disabled")
    req.user = user
    
    // Verify the user using the JWT_ENCRYPTION_KEY environment variable
    
    // Call the next middleware function
    next()
  }catch(err)
  {
    // Log any errors and send an error response to the client
    res.status(401).json({"error": err.message}).end()
  }
}

// Export the verifyUser middleware function
module.exports = {
  verifyUser
}
