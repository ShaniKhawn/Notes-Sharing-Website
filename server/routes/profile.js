const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Fetch user profile data
router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with only the data you want to display on the frontend
    const userData = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
