const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

router.post('/addjournal', journalController.saveJournalEntry);

router.get('/dispjournal', journalController.getUserJournals);

module.exports = router;
