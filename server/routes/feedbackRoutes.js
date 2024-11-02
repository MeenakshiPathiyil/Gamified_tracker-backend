const express = require('express');
const Feedback = require('../models/Feedback');
const feedbackRouter = express.Router();

feedbackRouter.post('/', async (req, res) => {
    console.log('POST /api/feedback hit');  // Debugging line
    try {
        const { message } = req.body;
        if (!message || typeof message !== 'string') {
            return res.status(400).json({ error: 'Feedback message is required and must be a string' });
        }
        const feedback = new Feedback({ message });
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error in feedback route:', error);  // Debugging line
        res.status(500).json({ error: 'An error occurred while submitting the feedback' });
    }
});


module.exports = feedbackRouter;