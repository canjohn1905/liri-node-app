require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify)
var fs = require("fs");

var command = process.argv[2];
var searchInput = process.argv[3];

//if the user inout concert-this <artist/band name here> 
if (command === "concert-this") {
  axios.get("https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp").then(
    function (response) {


      if (response.data.length > 0) {
        //if there is a data 
        // cosnol log it 
        console.log("Name of the venue: " + response.data[0].venue.name);
        console.log("Venue location: " + response.data[0].venue.city);
        console.log("Date & Time: " + response.data[0].datetime);
      }
      else {
        //if there is non
        // console log error message
        console.log("There is no data found");
      }

      // Name of the venue
      // Venue location
      // Date of the Event (use moment to format this as "MM/DD/YYYY")
      // console.log("---------------Data---------------");

      // console.log(response.data.venue.name);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

// spotify-this-song '<song name here>'
// This will show the following information about the song in your terminal/bash window
// node liri.js spotify-this-song '<song name here>
// This will show the following information about the song in your terminal/bash window
// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from
//Funtion for Music Info: Spotify

function spotifyThisSong(trackQuery) {

  // if no trackQuery is passed in, then we will be querying for this particular song
  if (searchInput === undefined) {
    trackQuery = "the sign ace of base";
  }

  // Spotify API request (if an object is returned, output the first search result's artist(s), song, preview link, and album)
  spotify.search({ type: 'track', query: trackQuery }, function (error, data) {
    if (error) { // if error
      console.log('Error occurred: ' + error);
    } else { // if no error
      // For loop is for when a track has multiple artists
      for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
        if (i === 0) {
          console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
        } else {
          console.log("              " + data.tracks.items[0].artists[i].name);
        }
      }
      console.log("Song:         " + data.tracks.items[0].name);
      console.log("Preview Link: " + data.tracks.items[0].preview_url);
      console.log("Album:        " + data.tracks.items[0].album.name);
    }


  });
}

if (command === 'spotify-this-song') {
  spotifyThisSong(searchInput);
}


// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.
// node liri.js movie-this '<movie name here>

if (process.argv.length < 4) {
  searchInput = "Mr. Nobody";
}
// console.log(searchInput);

var queryUrl = "http://www.omdbapi.com/?t=" + searchInput + "&y=&plot=short&apikey=trilogy";




///--------------MOVIE THIS----------------
if (command === 'movie-this') {

  axios.get(queryUrl).then(
    function (response) {
      console.log("---------Movie Details------- ");
      console.log("Title: " + response.data.Title);
      console.log("Release Year: " + response.data.Year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
      console.log("Made in: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("---------------Data---------------");
        console.log(error.response.data);
        console.log("---------------Status---------------");
        console.log(error.response.status);
        console.log("---------------Status---------------");
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error ", error.message);
      }
      console.log(error.config);
    });

}




//----- DO WHAT IT SAYS-----

if (command === "do-what-it-says") {
  
  fs.readFile("random.txt", "utf8", function (error, data) {

    spotify.search({ type: 'track', query: "random.txt" }, function (error, data) {
      if (error) { // if error
        console.log('Error occurred: ' + error);
      } else { // if no error
        // For loop is for when a track has multiple artists
        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
          if (i === 0) {
            console.log("Artist(s):    " + data.tracks.items[0].artists[i].name);
          } else {
            console.log("              " + data.tracks.items[0].artists[i].name);
          }
        }
        console.log("Song:         " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album:        " + data.tracks.items[0].album.name);
      }
  
  
    });
    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");
      console.log(dataArr);

  });

}
