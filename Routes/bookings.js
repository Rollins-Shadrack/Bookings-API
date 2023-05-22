const express = require('express')
const router = express.Router();
const {HotelBooking, ShowBookedPlaces } = require('../Controllers/bookings')

router.post('/booking',HotelBooking)

router.get('/booking',ShowBookedPlaces)


module.exports = router;