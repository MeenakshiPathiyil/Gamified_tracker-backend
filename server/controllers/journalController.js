const JournalEntry = require('../models/Journal');

exports.createJournalEntry = async (req, res) => {
  try {
    const { content, mood, tags } = req.body;
    
    // Assuming you have user authentication middleware that sets req.user
    const newEntry = new JournalEntry({
      user: req.user._id,
      content,
      mood,
      tags
    });

    const savedEntry = await newEntry.save();

    res.status(201).json({
      message: 'Journal entry created successfully',
      entry: savedEntry
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating journal entry',
      error: error.message
    });
  }
};

exports.getUserJournalEntries = async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id })
      .sort({ createdAt: -1 }) // Latest entries first
      .select('content mood tags createdAt');

    res.status(200).json({
      entries
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching journal entries',
      error: error.message
    });
  }
};

exports.updateJournalEntry = async (req, res) => {
  try {
    const { entryId } = req.params;
    const { content, mood, tags } = req.body;

    const updatedEntry = await JournalEntry.findOneAndUpdate(
      { _id: entryId, user: req.user._id },
      { content, mood, tags },
      { new: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({
        message: 'Journal entry not found'
      });
    }

    res.status(200).json({
      message: 'Journal entry updated successfully',
      entry: updatedEntry
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating journal entry',
      error: error.message
    });
  }
};

exports.deleteJournalEntry = async (req, res) => {
  try {
    const { entryId } = req.params;

    const deletedEntry = await JournalEntry.findOneAndDelete({
      _id: entryId,
      user: req.user._id
    });

    if (!deletedEntry) {
      return res.status(404).json({
        message: 'Journal entry not found'
      });
    }

    res.status(200).json({
      message: 'Journal entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting journal entry',
      error: error.message
    });
  }
};