const result = require('dotenv').config({ path:__dirname + '/.env'})
if (result.error) {
  console.error('Error loading .env file:', result.error);
} else {
  console.log('Environment variables loaded successfully.');
}
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

app.use(express.json());

const MONGO_URI='mongodb://localhost:27017/habitTrackerDB';

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');
app.use('/api/users', userRoutes); 
app.use('/api/habits', habitRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});