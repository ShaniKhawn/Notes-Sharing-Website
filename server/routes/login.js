const express = require('express');
const app = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

app.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, 'secretkey'); // Add token expiration time

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: user._id,
      isAdmin: user.isAdmin // Send the isAdmin property
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/', async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;
