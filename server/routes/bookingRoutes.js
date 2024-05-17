const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Get all bookings past today
router.get('/', bookingController.getFutureBookings);

// Get ALL bookings
router.get('/all', bookingController.getBookings);

//Create new booking
router.post('/', bookingController.createBooking);

module.exports = router;
