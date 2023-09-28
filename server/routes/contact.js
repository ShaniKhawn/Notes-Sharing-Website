const express = require('express');
const app = express.Router();
const Contact = require('../models/contact');

app.post('/', async (req, res) => {
  const { name, email, subject, description } = req.body;

  try {
    const newContact = new Contact({
      name,
      email,
      subject,
      description,
    });

    // Save the new contact to the database
    await newContact.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;
