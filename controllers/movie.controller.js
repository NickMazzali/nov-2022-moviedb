let router = require("express").Router()
let Movie = require(`../models/movie.model`)
// localhost:4000/movie/add
let validateSession = require("../middleware/validate-session")

router.post("/add", validateSession, async(req, res)=>{
   try{
    // prepping the movie object to be saved
    let movie = new Movie({
        movieTitle: req.body.movieTitle,
        movieDescription: req.body.movieDescription,
        movieYear: req.body.movieYear,
        isCurrentlyInTheaters: req.body.isCurrentlyInTheaters,
        rating: req.body.rating,
        owner_id: req.user._id
    })
    // save the data
    let newMovie = await movie.save()

    res.json({movie: newMovie, message:"movie was saved"})
   } catch(error){
    res.json({message: error.message})
   }
        
})

router.get("/", validateSession, async(req, res)=>{
    try{
        let movie = await Movie.find()
        res.json({movie: movie, message: "success"})
            // this returns all the movies in the database within an array
    }catch(error){
        res.json({message: error.message})
    }

})

router.get("/owner", validateSession, async(req, res)=>{
    try{
        let movie = await Movie.find({owner_id: req.user._id})
        res.json({movie: movie, message: "success"})
            // this returns all the movies in the database within an array
    }catch(error){
        res.json({message: error.message})
    }

})

router.delete("/:id", validateSession, async(req, res)=>{
    try{
        /* 
        let movieRecord = await Movie.findById(req.params.id)
        let owner = req.user._id == movieRecord.owner_id
        if (!owner){throw new Error("the id supplied for movie record does not match creator id") }
        */
        let deletedMovie = await Movie.deleteOne({_id: req.params.id, owner_id: req.user._id})
        res.json({deletedMovie: deletedMovie,
        message: deletedMovie.deletedCount > 0 ? "movie was deleted" : "movie was not removed"})
    }catch(error){
        res.json({message: error.message})
    }
})

router.patch("/update/:id", validateSession, async (req, res)=>{
  try{
    let filter = {_id: req.params.id, owner_id: req.user._id}
    let update = req.body
    let returnOptions = {new: true}
    let movie = await Movie.findOneAndUpdate(filter, update, returnOptions)

    res.json({message: movie ? "movie updated" : "movie was not updated( owner id didn't match) ", movie: movie ? movie : {}})
  } catch(error){
    res.json({
        message: error.message
    })
  }
})

router.get("/:id", async(req, res)=>{
    try{
        let movie = await Movie.findById({_id: req.params.id})
        res.json({movie: movie})
    } catch(error){
        res.json({messafe: error.message})
    }
})
module.exports = router