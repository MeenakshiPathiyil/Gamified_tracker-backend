const User = require('../models/userModel'); 
const bcrypt = require('bcrypt');
require('dotenv').config({ path:__dirname + '/.env'})

const registerUser = async (req, res) => {
  console.log('Data recieved at server in userController: ', req.body);

  try {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('Validation error: User already exists');
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', hashedPassword);


    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log('User registered: ', newUser);
    req.session.userId = newUser._id;

    res.status(201).json({ message: 'User registered successfully', sessionActive: true });
  } 
  catch (error) {
    console.error('Server error during registration: ', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({email});

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: 'Invalid Credentials'});
    }

    req.session.userId = user._id;
    res.json({ message: 'User login successfull' });
  } 
  catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getUserProfile = async(req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('username createdAt');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ username: user.username, Joined: user.createdAt });
  }
  catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };


