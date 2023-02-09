const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
require('dotenv').config()

router.post('/register', authController.register )

router.get('/verify/:id',authController.verify)

router.post('/login', authController.logIn)

router.post('/reset',authController.Reset)

router.post('/reset-password-done', authController.resestPasswordDone)

router.post('/otp', authController.otp)

router.get('/check', authController.getCheck)


module.exports=router;