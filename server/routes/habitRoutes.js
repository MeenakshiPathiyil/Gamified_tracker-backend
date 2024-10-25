const express = require('express');
const addHabit = require('../controllers/addhabit');
const updateProg = require('../controllers/habitprogress.js');

const habitRouter = express.Router();

habitRouter.post('/habits', addHabit.addNewHabit);
habitRouter.post('/progress', updateProg.updateHabitProgress);

module.exports = habitRouter;