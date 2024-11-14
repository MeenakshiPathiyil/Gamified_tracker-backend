const Habit = require('../models/Habit');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const addNewHabit = async(req, res) => {
    console.log('Request body:', req.body);
    const {title, frequency, customDays } = req.body;

    if (frequency === 'custom' && (!customDays || !customDays.length)) {
        return res.status(400).json({message: 'Please select days for custom frequency'});
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(400).json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        if (!userId || !title || !frequency) {
            return res.status(404).json({message: 'All fields are required'});
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const newHabit = new Habit ({
            title,
            frequency,
            customDays: frequency === 'custom' ? customDays: undefined,
            user: userId
            // daysOfWeek,
            // streak: 0,
            // points: 0
        });

        await newHabit.save();
        res.status(201).json({Message: 'Habit created succefully', habit: newHabit});
    }
    catch(error) {
        console.error('Error details:', error.message, error.stack);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({message: 'Invalid token'});
        }
        else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({message: 'Token expired'});        
        }
        else {
            res.status(500).json({message: 'Server Error', details: error.message});
        }
    }
};

module.exports = {addNewHabit};

