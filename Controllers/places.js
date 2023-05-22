const imageDownloader = require('image-downloader')
const path = require('path');
const fs = require('fs')
const Place = require('../models/places')
const jwt = require("jsonwebtoken")

const jwtSecret = 'iudfhihfowhfADNCWVGadnWR89JCAJojapjfMDSWE'
const uploadByLink = async(req,res,next) =>{
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg'
    await imageDownloader.image({
        url:link,
        dest: path.join(__dirname, '../uploads/' + newName)
    })
    res.json(newName)
}


const Upload = async(req,res) =>{
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++){
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace(/uploads\\/g, ''));
    }

    res.json(uploadedFiles)
}

const AddNewPlace = async(req,res) =>{
    const token = req.cookies.token;
    const {title, address, addedPhotos, description,perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body
    if(token){
        const id = jwt.verify(token, jwtSecret)
        const newPlace = await Place.create({
            owner: id.id,
            title, address, 
            photos: addedPhotos,
            description,
            perks, extraInfo, checkIn, checkOut, maxGuests,price
        })
        res.json(newPlace)
    }

}
const AllPlaces = async(req,res) =>{
    const token = req.cookies.token;
    if(token){
        const id = jwt.verify(token, jwtSecret)
        res.json(await Place.find({owner:id.id}))
    }
}
const OnePlace = async(req,res)=>{
    const {id} = req.params
    res.json(await Place.findById(id))
}
const UpdatePlace = async(req,res) =>{
    const {id} = req.params
    const token = req.cookies.token;
    const {title, address, addedPhotos, description,perks, extraInfo, checkIn, checkOut, maxGuests,price} = req.body
    if(token){
        const userid = jwt.verify(token, jwtSecret)
        const PlaceToUpdate = await Place.findById(id)
        if(PlaceToUpdate.owner.toString() === userid.id){
            PlaceToUpdate.set({
            title, address, 
            photos: addedPhotos,
            description,
            perks, extraInfo, checkIn, checkOut, maxGuests,
            price
            })
            await PlaceToUpdate.save()
            res.json('ok')
        }
        res.json(Place)
    }
}
const EntirePlace = async (req, res) => {
    try {
      const places = await Place.find().exec();
      res.json(places);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };



module.exports = {
    uploadByLink,
    Upload,
    AddNewPlace,
    AllPlaces,
    OnePlace,
    UpdatePlace,
    EntirePlace
}