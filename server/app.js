const express = require('express');
const mongoose = require('mongoose');
const habitRoutes = require('./routes/habitRoutes.js');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/habitTrackerDB', {
    useNewUrlParser: true,
    useUnifiedTopolgy: true
})

.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error: ', err));

app.use('/api', habitRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to habit tracker api');
});

app.use((err, req, res, next) => {
    res.status(500).json({message: 'Something went wrong!', error: err});
});

const PORT = process.env.PORT || 5000;
app.prependOnceListener(PORT, () => {
    console.log('Server is running on port ${PORT}');
});