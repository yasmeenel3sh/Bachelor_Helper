var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  Validations = require('../utils/validations'),
  Encryption = require('../utils/encryption'),
  EMAIL_REGEX = require('../config').EMAIL_REGEX,
 
 
  User = mongoose.model('User');
  


module.exports.register = function(req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there
  var valid =
    req.body.name &&
   
    Validations.isString(req.body.name) &&
    req.body.email &&
    Validations.isString(req.body.email) &&
    Validations.matchesRegex(req.body.email, EMAIL_REGEX) &&
    req.body.password &&
    Validations.isString(req.body.password) &&
    req.body.confirmPassword &&
    Validations.isString(req.body.confirmPassword)&&
    req.body.major;

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'name, email(String and of valid email format), password(String), confirmPassword(String) and major(String) are required fields.',
      data: null
    });
  }

  // Check that the password is 8+ characters
  var password = req.body.password.trim();
  if (password.length < 8) {
    return res.status(422).json({
      err: null,
      msg: 'Password must be of length 8 characters or more.',
      data: null
    });
  }


  // Check that password matches confirmPassword
  var confirmPassword= req.body.confirmPassword.trim();
  if (password !== confirmPassword) {
    return res.status(422).json({
      err: null,
      msg: 'password and confirmPassword does not match.',
      data: null
    });
  }

  if (!(/^[a-zA-Z]+$/.test(req.body.name))) {
    return res.status(422).json({
      err: null,
      msg: 'Name is invalid (only English characters).',
      data: null
    });
  }


 var majors= ["computerscience","dmet","businessinformatics","appliedarts","management","electronics","law","pharmacy","communication","networks","mechatronics","production","material"];
  if(!majors.includes(req.body.major.toLowerCase().trim())){
    return res.status(422).json({
      err: null,
      msg: 'major must be from this list [computerscience,dmet,businessinformatics,appliedarts,management,electronics,law,pharmacy,communication,networks,mechatronics,production,material]',
      data: req.body.major
    });
  }




  // Check that no other user is registered with this email
  User.findOne({
    email: req.body.email.trim().toLowerCase()
  }).exec(function(err, user) {
    // If an err occurred, call the next middleware in the app.js which is the error handler
    if (err) {
      return next(err);
    }
    // If there is a user with this email don't continue
    if (user) {
      return res.status(422).json({
        err: null,
        msg: 'A user with this email address already exists, please try another email address.',
        data: null
      });
    }

    // Encrypt the password before saving the user in the database
    Encryption.hashPassword(password, function(err, hash) {
      // If an err occurred, call the next middleware in the app.js which is the error handler
      if (err) {
        return next(err);
      }



      
      //delete req.body.isVerified
     

      //Expires in 1 hour
      req.body.password = hash;




        User.create(req.body, function(err, newUser) {
          if (err) {
            return next(err);
          }



          res.status(201).json({
            err: null,
            msg: 'Registration successful, you can now login to your account.',
            data: newUser.toObject()
          });
        });

      
    });
  });
};
module.exports.getAll = function (req, res, next) {
  User.find({}).exec(function (err, users) {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      err: null,
      msg: 'Products retrieved successfully.',
      data: users
    });
  });
};

module.exports.login = function(req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there

  var user = req.body.email && Validations.isString(req.body.email) && Validations.matchesRegex(req.body.email, EMAIL_REGEX);
 
  var valid = req.body.password && Validations.isString(req.body.password);



  if (!(user )) {
    return res.status(422).json({
      err: null,
      msg: 'email(String)  is required to login.',
      data: null
    });
  }

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'password(String) is required.',
      data: null
    });
  }

  if (user) {

    loginUser(req, res, next);


  } 
};






////////////////////////////////////// HELPERS ///////////////////////////////////////////////

function loginUser(req, res, next) {

  User.findOne({
    email: req.body.email.trim().toLowerCase()
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    }

    // If user not found then he/she is not registered
    if (!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found!',
        data: null
      });
    }

    // If user found then check that the password he entered matches the encrypted hash in the database
    Encryption.comparePasswordToHash(req.body.password, user.password, function(err, passwordMatches) {
      if (err) {
        return next(err);
      }

      // If password doesn't match then its incorrect
      if (!passwordMatches) {
        return res.status(401).json({
          err: null,
          msg: 'Password is incorrect.',
          data: null
        });
      }

     

      // Create a JWT and put in it the user object from the database
      let tokenData = user.toObject();
     



      var token = jwt.sign({
          // user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
          user: tokenData
        },
        req.app.get('secret'), {
          expiresIn: '21d'
        }
      );
      // Send the JWT to the frontend

      res.status(200).json({
        err: null,
        msg: 'Welcome',
        data: token
      });
    });
  });
}




