const User = require('../models/userModel'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config({ path:__dirname + '/.env'})

console.log('JWT_SECRET in user controller:', process.env.JWT_SECRET); // this should output the secret directly if loaded correctly


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

    // Create new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save(); // Save to MongoDB

    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    console.log('User registered: ', newUser);


    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
    console.log('Generated token: ', token);

    res.status(201).json({ message: 'User registered successfully', token });
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h'});
    res.json({ message: 'User login successfull', token });
  } 
  catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
