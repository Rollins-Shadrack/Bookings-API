const User  = require('../models/users')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

const jwtSecret = 'iudfhihfowhfADNCWVGadnWR89JCAJojapjfMDSWE'

let RegisterUser = async(req,res,next) =>{
    const {name, email, password} = req.body
    if(!name ||  !email || !password){
        return res.status(400).json({message:"All fields are required!"})
    }
    try{
        const hashedPassword = bcrypt.hashSync(password,10)
        const ExisitingUser = await User.findOne({email:email})
        if(ExisitingUser){
            return res.status(409).json({message:"User Already Registered, Login Instead!!"})
        }
        const newUser = new User({
            name:name,
            email:email,
            password:hashedPassword
        })
        await newUser.save()
        return res.status(200).json({message:"Successfull registration"})

    }catch(error){
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

const LoginUser = async(req,res,next) =>{
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
    }
    try{
        const user = await User.findOne({email:email})
        if(user){
            const passOk = bcrypt.compareSync(password, user.password)
            if(passOk){
                const token = jwt.sign({id: user._id},jwtSecret);
                res.cookie("token", token,{ httpOnly:true})
                return res.status(200).json({message:"Logged In Successfully",user:user})
            }else{
                return res.status(409).json({message:"Password Incorrect!"})
            }
        }else{
            return res.status(404).json({message:"User not Found!, Please create an account instaed"})
        }

    }catch(error){
        return res.status(500).json({message:"Internal server Error"})
    }
}

const Profile = async(req,res,next) =>{
    const token = req.cookies.token;
    if (token) {
        const id = jwt.verify(token, jwtSecret)
        const user = await User.findById(id.id)
        return res.status(200).json({ user });
    } else {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

const Logout =  async(req,res, next) =>{
    res.cookie('token','').json(true);
}

module.exports ={
    RegisterUser,
    LoginUser,
    Profile,
    Logout
}