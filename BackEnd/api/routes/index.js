var express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'), 
    authCtrl = require('../controllers/auth.controller'),
    mw = require('./middlewares');
var UserController =require ('../controllers/user.controller');
var SearchController = require('../controllers/Search.controller');

//---------------------------- Authentication Routes --------------------------------//
//router.get('/verify/:id/:token', authCtrl.verifyMail);
router.post('/auth/register', mw.isNotAuthenticated, authCtrl.register);
router.post('/auth/login', mw.isNotAuthenticated, authCtrl.login);
//--------------------------user Routes---------------------------//
router.patch('/user/update',mw.isAuthenticated, UserController.updateUser);
router.post('/user/mail',  UserController.sendMail);
  // --------------------- Search Contoller -------------------- //
router.get('/search/:country/:university/:major/:curr/:pp', SearchController.Search);
  // --------------------- End of Search Controller ------------ //




module.exports = router;
