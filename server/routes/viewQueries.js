const express = require('express');
const app = express.Router();
const Contact = require('../models/contact');

app.get('/:queryId', async (req, res) => {
  try {
    const queryId = req.params.queryId;

    const query = await Contact.findById(queryId);

    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }

    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = app;
