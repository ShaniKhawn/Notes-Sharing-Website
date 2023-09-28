const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); 

router.get('/', async (req, res) => {
  try {
    const allNotes = await Note.find().populate({path:'user', model: 'Users'});
    res.json(allNotes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
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
