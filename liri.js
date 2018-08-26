require("dotenv").config();
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var action = process.argv[2];

// if (action === "concert-this") {
//     concertThis();
// };
if (action === "spotify-this-song") {
    spotifyThisSong();
};
if (action === "movie-this") {
    movieThis();
};

// function concertThis() {
//     var preformerName = process.argv[3];
// }
function spotifyThisSong() {
    var songName = process.argv[3];
    if (songName === undefined) {
        songName = "The Sign";
    };
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //console.log(JSON.stringify(data, null, 2));
        var songInfo = data.tracks.items[0];

        // Artist(s):
        var artists = songInfo.artists;
        var allArtists = [];
        artists.forEach(element => {
            if ("name" in element) {
                allArtists.push(element.name);
            }
        });
        allArtists = allArtists.join(", ")
        console.log("Artist(s): " + allArtists);

        // The song's name:
        console.log("Song's name: " + songInfo.name);

        // A preview link of the song from Spotify:
        var previewUrl = songInfo.preview_url;
        if (previewUrl === null) {
            console.log("There is no preview url in the database");
        } else { console.log("Preview url: " + previewUrl); }

        // The album that the song is from:
        console.log("Album: " + songInfo.album.name);
    });
};
function movieThis() {
    var movieName = process.argv[3];
    omdb.search(movieName, function (err, movies) {
        if (err) {
            return console.error(err);
        } else {
            console.log(movies);
        }
        // if (movies.length < 1) {
        //     return console.log('No movies were found!');
        // }
        // movies.forEach(function (movie) {
        //     console.log(movie.title, movie.year);
        // });
    });
    // Title of the movie.
    // Year the movie came out.
    // IMDB Rating of the movie.
    // Rotten Tomatoes Rating of the movie.
    // Country where the movie was produced.
    // Language of the movie.
    // Plot of the movie.
    // Actors in the movie.
}