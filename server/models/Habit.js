const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema ({
    title: {type: String},
    frequency: {
        type: String
    },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    // daysOfWeek: [{type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}],
    // streak: {type: Number, default: 0},
    // points: {type: Number, default: 0}
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
