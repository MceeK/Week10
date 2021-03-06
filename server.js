//https://hub.packtpub.com/building-movie-api-express/
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
let path = require('path');
const app = express();
app.listen(8888);
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);

// Delete actor and their movies (only searches movies for actor and deletes them + actual actor)
app.delete("/actors/:id/movies", actors.deleteAllMovies);
// Remove movies from actor's list
app.delete("/actors/:actid/:movid", actors.deleteMovies);

//Movie RESTFul endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);

// Remove movie by ID
app.delete("/movies/:id", movies.deleteOne);
// Remove actors from movie's list
app.delete("/movies/:movid/:actid", movies.deleteActors);

// Increment all movies before 1995 by 7 years
app.put("/movies/increment", movies.increment);

// Remove movies before certain year
// app.delete("/movies/year/:year1", movies.remYear);
app.delete("/delmovies/:year1", movies.remYear);

// Add new actor to movie's list
app.put("/movies/:movid/:actid", movies.updateActor);
// Get movies between two years
app.get("/movies/:year1/:year2", movies.getYears);

