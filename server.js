const express = require("express");
const cors = require("cors");
require("dotenv").config();
//
const app = express();
app.use(cors());
app.use(express.json());
//
const axios = require("axios");
//
PORT = 3005;

/////////////////////////////////////////////////////////////////
// request CRUD
/////////////////////////////////////////////////////////////////

// http://localhost:3005/getmovies
app.get("/getmovies", getmoviesHandler);

// http://localhost:3005/
app.get("/", homeHandler);

/////////////////////////////////////////////////////////////////
// function's
/////////////////////////////////////////////////////////////////

// getmoviesHandler function
function getmoviesHandler(req, res) {
  // https://api.themoviedb.org/3/search/movie?api_key=fae5c20d4567826cc3af88cd810b6916&query=Jack+Reacher  // key + querys
  let url = `https://api.themoviedb.org/3/search/movie?api_key=fae5c20d4567826cc3af88cd810b6916&query=Jack+Reacher`;

  axios.get(url).then((moviesData) => {
    // console.log(moviesData.data.results);
    let dataFromMov = moviesData.data.results.map((movies) => {
      return new Movies(movies);
    });
    res.send(dataFromMov);
  });
}
// homeHandler function
function homeHandler(req, res) {
  res.send("it's working");
}
////////////////////////////////////////////////////////////////////
// constractor's
////////////////////////////////////////////////////////////////////

class Movies {
  constructor(movies) {
    (this.title = movies.title), (this.id = movies.id);
  }
}

////////////////////////////////////////////////////////////////////
// listen
app.listen(PORT, () => {
  console.log(`listen on ${PORT}`);
});
