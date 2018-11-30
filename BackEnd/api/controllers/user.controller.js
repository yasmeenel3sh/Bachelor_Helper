var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
  Encryption = require('../utils/encryption'),
  EMAIL_REGEX = require('../config').EMAIL_REGEX,
 
 
  User = mongoose.model('User');
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
    if (!(/^[a-zA-Z]+$/.test(req.body.name) )) {
      return res.status(422).json({
        err: null,
        msg: 'Name is invalid (only English characters).',
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

module.exports.sendMail = function (req, res, next) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:'Bachelor.Helper.GUC@gmail.com',
      pass:'1olfat2yasmeen3nourhan'
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
      return next(err);
    } else {
      res.status(200).json({
        err: null,
        msg: 'Email is Sent!',
        data: null
      });
    }
  });
}
