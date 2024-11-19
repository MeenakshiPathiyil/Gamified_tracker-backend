const express = require('express');
const Habit = require('../models/Habit'); 
const sessionAuth = require('../middleware/authMiddleware'); 

const habitRouter = express.Router();

habitRouter.post('/', async (req, res) => {
    const userId = req.session.userId; 

    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    const { title, frequency, customDays } = req.body;

    if (!title || !frequency) {
        return res.status(400).json({ message: 'Title and frequency are required' });
    }

    if (frequency === 'custom' && (!customDays || !customDays.length)) {
        return res.status(400).json({ message: 'Custom days are required for custom frequency' });
    }

    try {
        const newHabit = new Habit({
            user: userId,  
            title,
            frequency,
            customDays: frequency === 'custom' ? customDays : undefined, 
        });

        await newHabit.save();
        res.status(201).json({ message: 'Habit added successfully', habit: newHabit });
    } catch (error) {
        console.error('Error adding habit:', error.message);
        res.status(500).json({ message: 'Error adding habit', error: error.message });
    }
});

module.exports = habitRouter;
