const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/', async (req, res) => {
  try {
    const acceptedNotes = await Note.find({ status: 'accept' }).populate({path:'user', model: 'Users'});
    return res.status(200).json(acceptedNotes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
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
