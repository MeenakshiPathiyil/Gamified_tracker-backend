const express = require('express');
const router = express.Router();

// Import the controller
const { registerUser } = require('../controller/userController');
const User = require('../models/userModel');

// Define the route for registering a user
router.post('/register', registerUser);

// New route to fetch users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
