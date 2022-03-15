require('dotenv').config();
const nodemailer = require("nodemailer");

const sendMail = (xyz )=>{
    console.log('send mail',xyz);
var transporter = nodemailer.createTransport({
    // service: 'gmail', //Without smpt 
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
    
  },


});

    transporter.sendMail(xyz, function(error, res){
        if(error){
            //  res.send("Email could not sent due to error: "+error);
             console.log('Error',error);
        }else{
             res.send("Email has been sent successfully");
             console.log('mail sent' , res);
        } 
    }); 
}
      module.exports = sendMail;
