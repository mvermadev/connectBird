const express = require('express');
const router = express.Router();


router.get('/homeUser', (req, res)=>{
    res.render('home')
})

router.get('/loginUser', (req, res)=>{
    res.render('login')
})

router.get('/otpUser', (req, res)=>{
    res.render('otp')
})

router.get('/invalidUser', (req, res)=>{
    res.render('invalid')
})

module.exports = router