const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    emotion: { type: String, required: true },
    thoughts: { type: String, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' } 
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;
