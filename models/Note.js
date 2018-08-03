var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var noteSchema = new Schema({
  body: {
    type: String
  }
});
var Note = mongoose.model("Note", NoteSchema);
module.exports = Note;


