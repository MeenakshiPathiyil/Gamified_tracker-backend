const Habit = require('../models/Habit');

const updateHabitProgress = async (req, res) => {
    const {habitId, isCompleted} = req.body;

    try {
        const habit = await Habit.findById(habitId);
        if (!habit ) {
            return res.status(404).json({message: 'Habit not found'});
        }

        if (isCompleted) {
            habit.points += 10;
            habit.streak += 1;
        }
        else {
            habit.streak = 0;
        }

        await habit.save();
        res.status(200).json({message: 'Habit progress updated', habit});
    }
    catch(error) {
        res.status(500).json({message: 'Error updating habit progress', error});
    }
};

module.exports = {updateHabitProgress};

// habitSchema.methods.completeHabit = async function (isCompleted) {
//     try {
//         if (isCompleted) {
//             this.points += 10;
//             this.streak += 1;

//             await Progress.create({habit: this._id, status: 'complete'});
//         }
//         else {
//             await Progress.create({habit: this._id, status: 'incomplete'});
//         }

//         await this.save();
//     }
//     catch(error) {
//         console.error('Error completing habit: ', error);
//     }
// };