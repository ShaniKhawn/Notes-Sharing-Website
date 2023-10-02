const express = require("express");
const app = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");

app.post("/", async (req, res) => {
  const { name, email, password, confirmPassword, isAdmin } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered" });
    }

     // Hash the password
     const hashedPassword = await bcrypt.hash(password, 10); // Use a salt factor of 10

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword, isAdmin });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = app;
