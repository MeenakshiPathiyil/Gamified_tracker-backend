const Journal = require('../models/journalModel');

/**
 * Save a journal entry for the logged-in user
 */
const saveJournalEntry = async (req, res) => {
    try {
        // Assuming user ID is stored in the session
        const userId = req.session.userId; 

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const { emotion, thoughts } = req.body;

        // Validate input
        if (!emotion || !thoughts) {
            return res.status(400).json({ message: 'Emotion and thoughts are required' });
        }

        // Create and save the journal entry
        const newJournal = new Journal({ 
            emotion, 
            thoughts, 
            userId // Associate the entry with the logged-in user
        });

        await newJournal.save();

        res.status(201).json({ message: 'Journal entry saved successfully', journal: newJournal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error saving journal entry' });
    }
};

/**
 * Get all journal entries for the logged-in user
 */
const getUserJournals = async (req, res) => {
  try {
      const userId = req.session.userId;

      if (!userId) {
          return res.status(401).json({ message: 'User not authenticated' });
      }

      const journals = await Journal.find({ userId });

      res.status(200).json({ message: 'Journals retrieved successfully', journals });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error retrieving journal entries' });
  }
};


module.exports = {
    saveJournalEntry,
    getUserJournals,
};
