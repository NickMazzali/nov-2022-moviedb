// take our token that is provided by the request object(put it in headers:authorization)
// check to see if the token is expired. if it is expired, provide a response back to the user 
// if the token is valid we will create a variable to contain the user's information based off of the ID we captured in the creation of the token.
let jwt = require("jsonwebtoken")
let User = require(`../models/user.model`)
let validateSession = async(req,res, next)=>{
    try{
        let token = req.headers.authorization
        // verify the token to check if its expired and it will extract the payload 
        let decodedToken = await jwt.verify(token, process.env.JWT)
        console.log(decodedToken)

        let user = await User.findById(decodedToken.id)

        if(!user){
            throw Error ("User not found")
        }

        req.user = user 
        req.test = "this is a test"
        return next()
    }catch(error){
        res.json({message: error.message})
    }
    
}

module.exports = validateSession