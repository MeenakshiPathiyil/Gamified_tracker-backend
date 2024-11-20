const express = require('express');
const Habit = require('../models/Habit'); 
const sessionAuth = require('../middleware/authMiddleware'); 
const { addNewHabit, updateHabitCompletion } = require('../controllers/addhabit');

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

habitRouter.get('/getData', async (req, res) => {
    try {
        const userId = req.session.userId; // Ensure session exists
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const habits = await Habit.find({ user: userId });
        res.status(200).json({ habits });
    } catch (error) {
        console.error('Error fetching habits:', error.message);
        res.status(500).json({ message: 'Error fetching habits' });
    }
});


habitRouter.post('/update', async (req, res) => {
    const { habitId, checkedDays } = req.body;
    console.log("habitId: ", habitId);

    if (!habitId || !checkedDays) {
        return res.status(400).json({ message: 'Habit ID and checked days are required' });
    }

    try {
        const updatedHabit = await Habit.findByIdAndUpdate(
            habitId, 
            { $set: { checkedDays } },
            { new: true }
        );

        if (!updatedHabit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        res.status(200).json({ message: 'Habit updated successfully', habit: updatedHabit });
    } catch (error) {
        console.error('Error updating habit:', error.message);
        res.status(500).json({ message: 'Error updating habit', error: error.message });
    }
});



module.exports = habitRouter;
