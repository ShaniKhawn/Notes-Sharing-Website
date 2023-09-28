const express = require('express');
const app = express.Router();
const Contact = require('../models/contact');

app.get('/', async (req, res) => {
  try {
    
    const queries = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json(queries);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;
