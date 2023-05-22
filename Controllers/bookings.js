const Booking = require('../models/booking')
const Place = require('../models/places')
const jwt = require("jsonwebtoken")
const jwtSecret = 'iudfhihfowhfADNCWVGadnWR89JCAJojapjfMDSWE'
const HotelBooking = async(req,res) =>{
    const token = req.cookies.token
    if(token){
        const userid = jwt.verify(token, jwtSecret)
        const {place, checkIn, checkOut, numberOfGuests, name, mobile, price } = req.body
        const booking = await Booking.create({
            place, checkIn, checkOut, numberOfGuests, name, mobile, price, user:userid.id
        })
        res.json(booking)
        }
} 

const ShowBookedPlaces = async(req,res) =>{
    const {token} = req.cookies
    if(token){
        const userid = jwt.verify(token, jwtSecret)
        //console.log(await Booking.find({user:userid.id}).populate('place'))
        res.json(await Booking.find({user:userid.id}).populate('place'))
    }
}

module.exports = {
    HotelBooking,
    ShowBookedPlaces 
}