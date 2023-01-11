// add boilerplate code for a controller
// create a route that is a post (/signup)
// make sure route is working
// full url localhost:4000/user/signup

// !break down the url to two levels - user = first level belongs on app.js while the scond level /signup belongs on the conrtoller

let router = require(`express`).Router()
let User = require("../models/user.model")
let bcrypt = require(`bcrypt`)
let jwt = require(`jsonwebtoken`)

router.post("/signup", async (req, res)=> {
    try{
        //1. create a new object based off the model schema (is User)
        
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        })
        // 2. Try Catch - we want to try and save the data but if we get an error we want to send back the error message.
        let newUser = await user.save()
        // after we generate a NEW user, we can generate a token
        let token = jwt.sign({id: newUser._id}, process.env.JWT, {expiresIn: 60*60*24})
                                                                    // measured in seconds
        res.json({
            user: newUser,
            message: "success",
            token: token
        })
    } catch (error){
        res.json({message: error.message})
    }
})

router.post("/login", async (req, res)=> {
    try{
        // 1. check our database to see if the email that is supplied in the body is already found in the database
        let user = await User.findOne({email: req.body.email})

        // 2. if we find a document (aka record) in the database validate that password matches otherwise send a response that we don't have a match
       
            // does the user exist? if not, throw an error and skip to the catch
            if(!user){
                throw new Error("user not found")
            }
            // user.password === req.body.password   (the regular password, the hashed password)
            let isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
            // do the passwords match? if not, throw an error and skip to the catch
            if(!isPasswordMatch){
                throw new Error("passwords do not match")
            }
            // does everything work out? success!
            let token = jwt.sign({id: user._id}, process.env.JWT, {expiresIn: 60*60*24})
            res.json({user: user, message: "success", token: token})
    } catch (error) {
              res.json({message: error.message})
            }      
})

module.exports = router
