const express = require('express');
const { addNewHabit } = require('../controllers/addhabit');
// const updateProg = require('../controllers/habitprogress.js');
const authenticateJWT = require('../middleware/authMiddleware');

const habitRouter = express.Router();

habitRouter.post('/', authenticateJWT, addNewHabit);

habitRouter.get('/user/:userId', authenticateJWT, async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.params.userId });
        res.status(200).json(habits);
    } 
    catch (error) {
        console.error('Error fetching habits:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// habitRouter.post('/progress', updateProg.updateHabitProgress);

module.exports = habitRouter;

