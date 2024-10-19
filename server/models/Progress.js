const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    habit: {type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true},
    date: {type: Date, required: true},
    status: {type: String, enum: ['complete', 'incomplete'], default: 'incomplete'}
});

const Progress = mongoose.model('Progress', progressSchema);