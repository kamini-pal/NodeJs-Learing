const express = require('express');
const authController = require('../controller/auth.controller')
const router = express.Router()

router.post('/register', authController.register) ;

router.post('/login' , authController.loginuser) ;

module.exports = router