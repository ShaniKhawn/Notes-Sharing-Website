const express = require('express');
const app = express();
const multer = require('multer');
const User = require('../models/user');

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }
    
    const imageBuffer = req.file.buffer.toString('base64');

    const user = await User.findOneAndUpdate(
      { _id: 'user_id_here' },
      { image: `data:image/jpeg;base64,${imageBuffer}` },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ message: 'Image uploaded successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/', async (req, res) => {
    try {
      const user = await User.findOne();
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = app;