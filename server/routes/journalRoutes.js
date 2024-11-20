const express = require('express');
const router = express.Router();
const Journal = require('../models/journalModel');

// Route to save a journal entry
router.post('/journal', async (req, res) => {
    try {
        const { emotion, thoughts } = req.body;
        
        if (!emotion || !thoughts) {
            return res.status(400).json({ message: 'Emotion and thoughts are required' });
        }

        const newJournal = new Journal({ emotion, thoughts });
        await newJournal.save();

        res.status(201).json({ message: 'Journal entry saved successfully', journal: newJournal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving journal entry' });
    }
});

module.exports = router;
