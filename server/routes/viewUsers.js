const express = require('express');
const app = express.Router();
const User = require('../models/user');

// to get a list of all users
app.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'name email contact branch role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// delete a user by ID
app.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID and remove it
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;
