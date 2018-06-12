var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'); 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/send',(req,res,next)=>{

  console.log(req.query)
  nodemailer.createTestAccount((err, account) => {
    // create reusable transporter object using the default SMTP transport
    if(req.query.name == "" || req.query.from == "" || req.query.text == "") {
      res.json("error validating")
      return next()
    }



    let transporter = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        // port: 465,
        // secure: true, // true for 465, false for other ports
        service:'Gmail',
        auth: {
            user: process.env.email,
            pass: process.env.password // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: req.query.from, // sender address
        to: process.env.email, // list of receivers
        subject: req.query.subject, // Subject line
        text: req.query.text // plain text body
       
    };
    console.log(mailOptions)
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
       
        if (error != null) {
          res.json(error)
          return next()
        }
         res.send("success")  
         return next()
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
 });

}) 

// router.get('/*', function(req, res ){

//   res.redirect('/')

// })
module.exports = router;
