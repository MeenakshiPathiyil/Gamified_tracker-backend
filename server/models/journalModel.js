const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    emotion: { type: String, required: true },
    thoughts: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal;