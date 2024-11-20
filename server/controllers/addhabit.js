const Habit = require('../models/Habit');
const User = require('../models/userModel');

const addNewHabit = async (req, res) => {
    console.log('Request body:', req.body); 
    console.log('Session:', req.session);

    const { title, frequency, customDays } = req.body;

    if (frequency === 'custom' && (!customDays || !customDays.length)) {
        return res.status(400).json({ message: 'Please select days for custom frequency' });
    }

    if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: 'User not authenticated or session missing' });
    }

    try {
        const userId = req.session.userId;

        console.log('User ID from session:', userId);

        if (!title || !frequency) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newHabit = new Habit({
            title,
            frequency,
            customDays: frequency === 'custom' ? customDays : undefined,
            user: userId,
        });

        console.log('New habit data:', newHabit);

        await newHabit.save();
        res.status(201).json({ message: 'Habit created successfully', habit: newHabit });
    } catch (error) {
        console.error('Error details:', error.message, error.stack);
        res.status(500).json({ message: 'Error adding habit', error: error.message });
    }
};

const updateHabitCompletion = async (req, res) => {
    const { habitId, checkedDays } = req.body;
    
    if (!habitId || !checkedDays) {
        return res.status(400).json({ message: 'Habit ID and checked days are required' });
    }

    try {
        const updatedHabit = await Habit.findByIdAndUpdate(
            habitId, 
            { $set: { checkedDays } }, // Update the checkedDays field
            { new: true }
        );

        if (!updatedHabit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        res.status(200).json({ message: 'Habit updated successfully', habit: updatedHabit });
    } catch (error) {
        console.error('Error updating habit completion:', error.message);
        res.status(500).json({ message: 'Error updating habit', error: error.message });
    }
};



module.exports = { addNewHabit, updateHabitCompletion };
