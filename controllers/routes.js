
//const Card = require("../models/Card.js");

module.exports = function(app){
	
	
	// Route used to query MongoDB for card.
	app.get("/api/card:cardID", function(req, res) {

	  //We will find single card record.
	  // Article.find({{"cardID": req.params.cardID}}).sort([
	  //   ["dateSaved", "descending"]
	  // ]).exec(function(err, card) {
	  //   if (err) {
	  //     console.log(err);
	  //   }
	  //   else {
	  //     res.send(card);
	  //   }
	  // });
	});

	// This is the route we will send POST requests to save card/clues.
	app.post("/api/card", function(req, res) {
	  
	  // //Here we'll save the article based on the JSON input.
	  // Article.create(req.body, function(err, doc) {
	  //   if (err) {
	  //     console.log(err);
	  //   }
	  //   else {
	  //     res.send(doc);
	  //   }
	  // });
	});

	

	// Main Route. This will redirect the user to our rendered React application
	app.get("*", function(req, res) {
	
	  res.sendFile(process.cwd() + '/public/index.html');
	});


};// END module.exports