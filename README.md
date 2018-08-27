# Liri Bot

### Overview
LIRI is a _Language_ Interpretation and Recognition Interface. Specifically, Liri is a command line node app that takes in parameters and gives back data.

### How does it work?
Run "liri.js" file with node while adding an "action argument" and an optional "item argument".
Template: node liri.js action item

#### Posible actions:

1. concert-this
Search the Bands in Town Artist Events API and outputs information about a concert (of the item argument).

2. spotify-this-song
Search the Spotify API and outputs information about a song (a default song or the item argument).

3. movie-this
Search the OMDB API and outputs information about a movie (default movie or the item argument).

4. do-what-it-says
Run one surprise action from the above possible action (spoiler - the "surprise action" is in the "random.txt" file).

#### Optional items:
* items that are more than one word should be combined with a "+" sign.

For concert-this, the acceptable item is artists/bands name.
Examples: Twice, drake, RadioHead, Dave+Matthews+Band.

For spotify-this-song, the acceptable item is the song title.
Examples: tt, in+my+feelings, DayDreaming, Two+Step.

For movie-this, the acceptable item is the movie title.
Examples: mile+22, xxx, shawshank+redemption, Crazy+Rich+Asians.

### Why does it useful?
This is a great example of using node.js to do actions in the backend. Actions like:
1. Taking user input and search, retrieve and display information from an API.
2. Using "npm".
3. Using "require" to link files.
4. Using "fs" to append information on a file (run the app and then check out "log.txt").
5. using "env" to keep information private (from Github).
