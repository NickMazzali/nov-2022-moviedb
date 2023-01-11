# MERN -Stack
M- Mongo
E- Express
R- React
N- Node

### Traditional Databases
Databases - collection of tables (user, products, movies, blog)
Tables - Primary key (ID of that record) columns inside the table (ie: username, firstname, lastname, dob)
Records - rows of values that are stoed in the table 

###Mongo Database

Database = Database
tables are called collections
instead of records, mongo calls them documents

## Getting server started 
- need a package.json file (`npm init -y)
- install express (`npm install express)
- install mongoose (npm i mongoose)
- install dotenv (npm i dotenv)
- update package file to your correct .js file (app.js)

##  .gitignore
-create a .gitignore
/node_modules

## app.js file
- add boiler plate code and have the app listen on 4000
 ```js
let express = require(`express`)
let app = express()
let PORT = 4000
require("dotenv").config()

app.listen(process.env.PORT, function(){
    console.log(`movie app is listening on ${process.env.PORT}`)
})
```
## .env file
- contains constants that are specific for our environment
- store items in there that you do not want published 
- add .env to the gitignore
- set the `PORT = 4000`  

## Creating Models
- models help define what your database collection will look like
- boiler plate

let mongoose = require("mongoose")

let userSchema  = new mongoose.Schema({
})
module.exports = mongoose.model("User", userSchema)

## controllers 
- they will take in user requests and send back information
- controllers will do the work and will create, read, update, or delete from the database.


boilerplate for controllers

const router = require("express").Router()



module.exports - router


## Bcrypt - Hashing Passwords
- this will encrypt our password
- npm i bcrypt in order to use it in your files
- to hash the password you can use this example
```js
password: bcrypt.hashSync(req.body.password, 10)
```
- you will need to use bcrypt.compare() to compare the unhashed and hashed passwords
```js
let isPasswordMatch = await bcrypt.compare(req.body.password, user.password)
```

## JWT - JSON Web Token
- used to helpidentify and to authenticate
- should be given in user login and signup
jwt.sign has three arguments: payload, encrypt and decrypt message, option sets

```js
let token = jwt.sign({id: newUser._id}, process.env.JWT, {expiresIn: 60*60*24})
```
