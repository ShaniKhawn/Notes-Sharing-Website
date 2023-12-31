const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const Note = require('../../models/Note');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename
  },
  
});

const upload = multer({ storage });

router.post('/', upload.single('notes-file'), async (req, res) => {
  const { branch, subject, fileType, description, user } = req.body;

  try {
    const newNote = new Note({
      branch,
      subject,
      fileType,
      description,
      user,
      fileName: req.file.originalname,
    });

    await newNote.save();

    res.status(201).json({ message: 'File uploaded successfully!' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'An error occurred while uploading the file.' });
  }
});

module.exports = router;
