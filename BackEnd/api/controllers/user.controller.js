var mongoose = require('mongoose'),
  
  Validations = require('../utils/validations'),
 
   smtpTransport = require('nodemailer-smtp-transport'),
  nodemailer = require('nodemailer');

  const multer =require('multer');
 

//************************************************ */
//this part is used to create a folder in the backend to 
//store the files uploaded but since its already implemented in the 
//app.js so no need to repeat it again

//  const storage=multer.diskStorage({
//    destination:function(req,file,cb){
//      cb(null,'./uploads');
//    },
//    filename:function(req,file,cb){
//      cb(null,file.originalname);
//    }
//  })
 
 //const upload =multer({storage:storage});
//************************************************** */

  User = mongoose.model('User');
 
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

    // router.post("/upload",upload.single('productImage'),(req,res,next)=>{
    //   console.log(req.file);
    // })
//*************************************************************************/
//here is the method to update Image and it uses the userUpdate method
module.exports.updateImage = function (req, res, next) {
  User.findByIdAndUpdate(
    req.decodedToken.user._id, {
      $set: { photo: req.body.photo }//how does he set the photo here
    }, {
      new: true
    }
  ).exec(function (err, updateUser) {
    if (err) {
      console.log(err)
      return next(err);
    } else {
      res.status(200).json({
        err: null,
        msg: 'the image was really uploaded',
        data: token
      });
    }
  });
};
//***********************************************
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
var smtpTransport = require('nodemailer-smtp-transport');

module.exports.sendMail = function (req, res, next) {
 console.log("sending");
  var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',

    auth: {
      user:'Bachelor.Helper.GUC@gmail.com',
      pass:'1olfat2yasmeen3nourhan'
    }
  }));
  transporter.verify(function(error, success) {
    if (error) {
         console.log(error);
    } else {
         console.log('Server is ready to take our messages');
    }
 });
  var mailOptions = {
    //***********i added this part */
    from: req.body.from,
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
