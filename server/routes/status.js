// routes/status.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); // Import your Note model or adjust the path accordingly

router.post('/:noteId', async (req, res) => {
  try {
    const { noteId } = req.params;
    const { status } = req.body;

    // Update the note status in your database
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      { status },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // acceptance and rejection logic here

    return res.status(200).json(updatedNote);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
