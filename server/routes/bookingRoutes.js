const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Get all bookings
router.get('/', bookingController.getFutureBookings);

//Create new booking
router.post('/', bookingController.createBooking);

module.exports = router;
