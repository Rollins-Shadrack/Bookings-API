const express = require('express')
const router = express.Router();
const {RegisterUser, LoginUser, Profile, Logout} = require('../Controllers/users')

router.post('/register',RegisterUser)

router.post('/login', LoginUser)

router.get('/profile', Profile)

router.post('/logout', Logout)


module.exports = router;
