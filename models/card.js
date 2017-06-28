// Require mongoose
const Mongoose = require("mongoose");
// Create a schema class
const Schema = Mongoose.Schema;

// Create the Card schema
var CardSchema = new Schema({
  // Just a string
  cardId: {
    type: String
  },
  // Array of clue objects
  clue: []
});

// Create the Note model with the NoteSchema
var Card = Mongoose.model("Card", CardSchema);

// Export the Note model
module.exports = Card;
