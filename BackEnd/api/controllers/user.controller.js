var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
  Encryption = require('../utils/encryption'),
  EMAIL_REGEX = require('../config').EMAIL_REGEX,
 
 
  User = mongoose.model('User');
  
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
  
    const set = {
      name: req.body.name,
      password:req.body.password,
      major:req.body.major,
      country:req.body.bachCountry,
      bachYear: req.body.bachYear,
      info: req.body.info
    };
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
      }
    });
  };

var nodemailer = require('nodemailer');

module.exports.sendMail = function (req, res, next) {

  var transporter = nodemailer.createTransport({
    service: 'gmail',
  });
  
  var mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}