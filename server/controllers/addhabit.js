const Habit = require('../models/Habit');
const User = require('../models/userModel');

const addNewHabit = async(req, res) => {
    const {userId, title, frequency, daysOfWeek} = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const newHabit = new Habit ({
            title,
            user: user._id,
            frequency,
            daysOfWeek,
            streak: 0,
            points: 0
        });

        await newHabit.save();
        res.status(201).json({Message: 'Habit created succefully', habit: newHabit});
    }
    catch(error) {
        res.status(500).json({message: 'Error creating habit', error});
    }
};

module.exports = {addNewHabit};