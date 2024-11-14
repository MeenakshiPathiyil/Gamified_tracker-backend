const express = require('express');
const userRouter = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/userController');
const User = require('../models/userModel')
const sessionAuth = require('../middleware/authMiddleware');

// Define the route for registering a user
userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/profile', sessionAuth, getUserProfile);  

module.exports = userRouter;



