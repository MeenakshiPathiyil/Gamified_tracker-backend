const express = require('express');
const userRouter = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Define the route for registering a user
userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

// New route to fetch users
userRouter.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = userRouter;
