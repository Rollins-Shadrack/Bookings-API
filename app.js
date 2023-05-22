const express = require('express')
const app = express()
const cors = require("cors");
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require("dotenv").config()

//Setting up the database
mongoose.connect('mongodb://127.0.0.1:27017/RSO_Bookings').then(()=>{console.log('mongodb connected')})

//Initializing body parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser())

//this makes the images visible from the folder to the browser
app.use('/uploads', express.static(__dirname+'/uploads'))


app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}))



//design routes
app.use('/users', require('./Routes/users'))
app.use('/places', require('./Routes/places'))
app.use('/bookings', require('./Routes/bookings'))

const PORT  =  process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`server started at port ${PORT}`))