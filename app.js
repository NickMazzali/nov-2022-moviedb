let express = require(`express`)
let app = express()
let PORT = 4000
let userController = require(`./controllers/user.controller`)
let movieController = require(`./controllers/movie.controller`)
let cors = require(`cors`)

// ! connecting to the database (DB)
const mongoose = require("mongoose");

mongoose.set(`strictQuery`, true)
mongoose.connect("mongodb://127.0.0.1:27017/moviedb");
let db = mongoose.connection;

require("dotenv").config()
db.once("open", () =>{ console.log("Connected to the DB")});
app.use(express.json())
app.use(`/user`, userController)
app.use(`/movie`, movieController)
app.use(cors())

app.listen(process.env.PORT, function () {
  console.log(`movie app is listening on port ${process.env.PORT}`);
});