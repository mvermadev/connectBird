const express = require('express')
const router = express.Router();
// const bodyParser = require('body-parser')
const nodemailer = require('nodemailer');
const rn = require('random-number');

const options = {
    min : 10000,
    max: 100000,
    integer : true
}
var ran = rn(options)
// var ran = setTimeout(()=>{
//     ran.value = rn(options)
// }, 10000)


router.post('/sendMail', (req, res)=>{

    const name = req.body.name;
    const email = req.body.email;
    
    // console.log(ran);
    // function ChangeOTP(){
    //     setTimeout(()=>{
    //      return ran = rn(options);
    //     }, 50000);
    // }

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user: 'servicebird365@gmail.com',
            pass : 'b-i-r-deservices'
        }
    });
    
    const mailOptions ={
        from: 'ConnectBird',
        to: email, // receiver email
        subject: 'OTP',
        text: 'Hey ' + name +', Your OTP Verification is : ' + ran + ' for registration process.'
    }
    
 

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
        }else{
            console.log('EMail is sended ');
            console.log('OTP : ', ran)
            res.end();
        } 
    })
    res.redirect('/otpUser')
    res.end();
})

router.post('/sendOTP', (req, res)=>{
 const otp = req.body.otp;

     if(otp == ran){
         console.log('Succed')
         res.redirect('/homeUser')
     }
     else{
         console.log('Invalid OTP')
         res.redirect('/invalidUser')
     }
     res.end()
})

module.exports = router
