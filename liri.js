require("dotenv").config();
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var moment = require("moment");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var action = process.argv[2];
var searchItem = process.argv[3];

function concertThis(artist_name) {
    var preformerName = artist_name;
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
function spotifyThisSong(user_song) {
    var songName = user_song;
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
function movieThis(user_movie) {
    var movieName = user_movie;
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
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        var randomAction = data.split(",");
        action = randomAction[0];
        searchItem = randomAction[1];
        runLiri();
    });
}
function logActions() {
    if (searchItem === undefined) {
        searchItem = "";
    };
    fs.appendFile("log.txt", action + "," + searchItem + "\r\n", function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Content Added!");
        }
    });
}
function runLiri() {
    switch (action) {
        case "concert-this":
            concertThis(searchItem);
            break;

        case "spotify-this-song":
            spotifyThisSong(searchItem);
            break;

        case "movie-this":
            movieThis(searchItem);
            break;

        case "do-what-it-says":
            doWhatItSays();
            break;
    };
    logActions();
}

runLiri();

