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
    if (preformerName === undefined) {
        preformerName = "drake";
    };
    request("https://rest.bandsintown.com/artists/" + preformerName + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //console.log(JSON.parse(body));
            var concertIinfo = JSON.parse(body);
            console.log("Venue: " + concertIinfo[0].venue.name);
            console.log("City: " + concertIinfo[0].venue.city);
            var eventDate = moment(concertIinfo[0].datetime).format("MM-DD-YYYY");
            console.log("Date: " + eventDate);
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
    console.log(user_movie)
    var movieName = user_movie;
    // if (movieName === undefined) {
    //     movieName = "shrek";
    // };
    request("http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.parse(body));
            var movieIinfo = JSON.parse(body);
            console.log("Title: " + movieIinfo.Title);
            console.log("Year: " + movieIinfo.Year);
            console.log("Rated " + movieIinfo.Rated);
            console.log("Rotten Tomatoes score: " + movieIinfo.Ratings[2].Value);
            console.log("Produced in: " + movieIinfo.Country);
            console.log("Language: " + movieIinfo.Language);
            console.log("Plot: " + movieIinfo.Plot);
            console.log("Actors: " + movieIinfo.Actors);
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
            console.log("User actions added to log.txt!");
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

