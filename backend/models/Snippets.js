var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var SnippetsSchema = new Schema(
  {
    card_title: String,
    card_description: String,
    card_code: String,
    card_example: String
  },
  {
    versionKey: false
  }
);

const Snippets = mongoose.model("Snippets", SnippetsSchema, "snippets");

module.exports = Snippets;
