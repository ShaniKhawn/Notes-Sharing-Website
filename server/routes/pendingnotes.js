const express = require('express');
const router = express.Router();
const path = require('path');
const Note = require('../models/Note');

// To get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().populate({path:'user', model: 'Users'});
    const getNotes = notes.map((note) => ({
      ...note.toObject(),
      downloadLink: `/download/${note._id}`,
      noteid: note._id, // Include the noteid
    }));

    res.json(getNotes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Download a specific note by ID
router.get('/download/:noteId', async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const filePath = path.join(__dirname, '../upload', note.fileName);
    res.download(filePath, note.fileName);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a specific note by ID
router.delete('/:noteId', async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Delete the note from the database
    await Note.findByIdAndDelete(noteId);

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
