const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  branch: String,
  subject: String,
  fileType: String,
  description: String,
  filePath: String,
  userId: String,
  uploadingDate: {type : Date, default : Date.now},
  status: {type: String, default: 'pending'},

});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
