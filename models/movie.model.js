let mongoose = require("mongoose")

let movieSchema = new mongoose.Schema({
    movieTitle: String,
    movieDescription: String,
    movieYear: Number,
    isCurrentlyInTheaters: Boolean,
    rating: Number,
    owner_id: String,
    // type: mongoose.Types.ObjectId, ref: "User"
})

module.exports = mongoose.model("movie", movieSchema)