const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: 'User', // Default role is 'User'
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default isAdmin to false
  },
});

module.exports = mongoose.model('Users', UserSchema);
