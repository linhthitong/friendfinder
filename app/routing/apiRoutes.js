// ===============================================================================
// LOAD DATA
// We are linking our routes to "data" sources.
// These data sources hold arrays of information on tableFriends.
// ===============================================================================

var friends = require("../data/friends");
//console.log("l.8", friends)
// console.log(friends.tableFriends)


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/survey", function (req, res) {
    res.json(friends);
  });


  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/survey", function (req, res) {

    var newFriend = req.body;
   // console.log("newFriend", newFriend);
    var newFriendScores = newFriend.scores;

    var match;

    var lowestDif = 100;

    for (var i = 0; i < friends.length; i++) {
      var currentFriend = friends[i];
      var totalDif = 0;
      for (var j = 0; j < currentFriend.scores.length; j++) {
        totalDif += Math.abs(parseInt(currentFriend.scores[j]) - (parseInt(newFriendScores[j])));
      }
      if (totalDif < lowestDif) {
        lowestDif = totalDif;
        match = currentFriend;
      }
    }

    //console.log("match", match)
   friends.push(newFriend);
   res.json(match)

  })


  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function () {
    // Empty out the arrays of data
    survey = [];
    // waitListData = [];

    console.log(survey);
  });

};
