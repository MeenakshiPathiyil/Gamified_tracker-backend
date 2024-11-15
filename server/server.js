const result = require('dotenv').config({ path:__dirname + '/.env'})
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Environment variables loaded successfully.');
}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: 'sepersecret',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

const MONGO_URI='mongodb://localhost:27017/habitTrackerDB';

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const userRouter = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
// const gameMapRoutes = require('./routes/gameMapRoutes');

app.use('/api/user', userRouter); 
app.use('/api/habits', habitRoutes);
app.use('/api/feedback', feedbackRoutes);
// app.use('/api/gameMap', gameMapRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


