var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
 
  nodemailer = require('nodemailer');

  const multer =require('multer');

  User = mongoose.model('User');
  require('dotenv').config();
  
  
 
  //get a user by id
  module.exports.getUser = function (req, res, next)  {
      if (!Validations.isObjectId(req.params._id)) {

        return res.status(422).json({
          err: null,
          msg: 'userId parameter must be a valid ObjectId.',
          data: null
        });
      }
     
      User.findById(req.params._id).exec(function (err, user) {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .status(404)
            .json({ err: null, msg: 'user not found.', data: null });
        }
        res.status(200).json({
          err: null,
          msg: 'user retrieved successfully.',
          data: user
        });
       
      });
    };


  module.exports.updateUser = function (req, res, next) {
    delete req.body.password;
    delete req.body.email;
  
    let valid = req.body.name
      && Validations.isString(req.body.name);
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'Name cannot be empty!',
        data: null
      });
    }

  
    let set = {
      name: req.body.name,
      major:req.body.major,
      bachCountry:req.body.bachCountry,
      bachUni:req.body.bachUni,
      bachYear: req.body.bachYear,
      info: req.body.info
    };
    console.log(set);
    
  //here is the main functionality
    User.findByIdAndUpdate(
      req.decodedToken.user._id, {
        $set: set
      }, {
        new: true
      }
    ).exec(function (err, updateUser) {
      if (err) {
        console.log(err)
        return next(err);
      }
      if (!updateUser) {
        return res
          .status(404)
          .json({
            err: null,
            msg: 'User not found.',
            data: updateUser
          });
      }
      else {
        res.status(200).json({
          err: null,
          msg: 'Information is Updated!',
          data: updateUser
        });
        console.log(updateUser);
      }
    });
  };

  var nodemailer = require('nodemailer');



var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports.sendMail = function (req, res, next) {
 console.log("sending");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
       type: "OAuth2",

      user: process.env.MAIL_USER, 
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET_KEY,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN

  }
});
  transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Server is ready to take our messages');
    }
 });
  var mailOptions = {

    to: req.body.to,
    subject: req.body.subject,
    text: 'Sent from: ' + req.body.from + '\n' + req.body.text

  };
  

     
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
        
         console.log(error);
         return next(error);
       } else {
         res.status(200).json({
           err: null,
           msg: 'Email is Sent!',
           data: info
         });
       }
     });
   
  }
