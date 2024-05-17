const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/availabilityController');

// Get all availabilities
router.get('/all', availabilityController.getAllAvailabilities);

// Get availabilities by specific day and optionally by coach
router.get('/by-day', availabilityController.getAvailabilitiesByDayAndCoach);

// Create new availability
router.post('/', availabilityController.createAvailability);

// Update availability
router.put('/:id', availabilityController.updateAvailability);

module.exports = router;
