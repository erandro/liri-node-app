require("dotenv").config();
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var request = require("request");
var keys = require("./keys.js");
var moment = require('moment');

var spotify = new Spotify(keys.spotify);
var action = process.argv[2];

if (action === "concert-this") {
    concertThis();
};
if (action === "spotify-this-song") {
    spotifyThisSong();
};
if (action === "movie-this") {
    movieThis();
};

function concertThis() {
    var preformerName = process.argv[3];
    request("https://rest.bandsintown.com/artists/" + preformerName + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body));
            //console.log("Venue: " + body.venue.name);
            //console.log("City: " + body[0].venue);
            //var eventDate = moment(body[0].datetime).format("MM-DD-YYYY");
            //console.log("Date: " + eventDate);
        };
    });
};
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
    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(JSON.parse(body));
            console.log("Title: " + body.Title);
            console.log("Year: " + body.Year);
            console.log("Rated " + body.Rated);
            console.log("Rotten Tomatoes score: " + body.Ratings);
            console.log("Produced in: " + body.Country);
            console.log("Language: " + body.Language);
            console.log("Plot: " + body.Plot);
            console.log("Actors: " + body.Actors);
        };
    });
};