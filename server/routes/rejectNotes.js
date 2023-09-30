const express = require('express');
const router = express.Router();
const path = require('path');
const Note = require('../models/Note');

router.get('/', async (req, res) => {
  try {
    const rejectedNotes = await Note.find({ status: 'reject' }).populate({path:'user', model: 'Users'});
    return res.status(200).json(rejectedNotes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

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
    
    res.download(filePath, note.fileName);
  } catch (error) {
    console.error('Error during download:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:noteId', async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    await Note.findByIdAndDelete(noteId);

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
