const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const path = require('path');
const fs = require('fs');

router.get('/', async (req, res) => {
  try {
    const allNotes = await Note.find().populate({path:'user', model: 'Users'});
    res.json(allNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Download a specific note by ID
router.get('/:noteId/download', async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);
    console.log('Note:', note);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    console.log('note.fileName', note.fileName);
    const uploadDir = path.join(__dirname, '../uploads');
    // console.log('filePath',uploadDir);
    const filePath = path.join(uploadDir, note.fileName);
    
    res.download(filePath, note.fileName); // Send the file for download
  } catch (error) {
    console.error('Error during download:', error);
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