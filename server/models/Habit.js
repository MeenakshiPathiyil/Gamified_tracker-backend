const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema ({
    title: {type: String},
    frequency: {
        type: String
    },
    customDays: { type: [String], default: undefined},
    checkedDays: { type: [Boolean], default: Array(7).fill(false) }, 
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});

const Habit = mongoose.model('Habit', habitSchema);

module.exports = Habit;
