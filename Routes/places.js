const express = require('express')
const router = express.Router();
const multer = require('multer')
const {uploadByLink,Upload,AddNewPlace, AllPlaces,OnePlace,UpdatePlace, EntirePlace,HotelBooking,ShowPlace} = require('../Controllers/places')

router.post('/upload-by-link',uploadByLink)


const photosMiddleware = multer({dest:'./uploads'});
router.post('/upload',photosMiddleware.array('photos', 100),Upload)

router.post('/newplaces', AddNewPlace)

router.post('/', AllPlaces)

router.get('/:id', OnePlace)

router.put('/update-place/:id', UpdatePlace)

router.post('/allplaces',EntirePlace)

module.exports = router;