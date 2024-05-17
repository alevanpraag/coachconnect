const express = require('express');
const router = express.Router();
const callHistoryController = require('../controllers/callHistoryController');

// Get all call histories
router.get('/', callHistoryController.getPaginatedCallHistories);

//Create new history
router.post('/', callHistoryController.createCallHistory);

module.exports = router;
