const express = require('express');
const router = express.Router();
const path = require('path');
const Note = require('../../models/Note');

// get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().populate({path:'user', model: 'Users'})
    
    const notesWithDownloadLinks = notes.map(note => ({
      ...note.toObject(),
      downloadLink: `/download/${note._id}`
    }));

    res.json(notesWithDownloadLinks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//download a specific note by ID
router.get('/:noteId/download', async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Note.findById(noteId);
    console.log('Note:', note);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }
    console.log('note.fileName', note.fileName);
    const uploadDir = path.join(__dirname, '../../uploads');
    // console.log('filePath',uploadDir);
    const filePath = path.join(uploadDir, note.fileName);
    
    res.download(filePath, note.fileName); // Send the file for download
  } catch (error) {
    console.error('Error during download:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
