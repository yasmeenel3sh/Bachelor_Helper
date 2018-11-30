var express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'), 
    authCtrl = require('../controllers/auth.controller'),
    mw = require('./middlewares');

var SearchController = require('../controllers/Search.controller');
//---------------------------- Authentication Routes --------------------------------//
//router.get('/verify/:id/:token', authCtrl.verifyMail);
router.post('/auth/register', mw.isNotAuthenticated, authCtrl.register);
router.post('/auth/login', mw.isNotAuthenticated, authCtrl.login);
  // --------------------- Search Contoller -------------------- //
router.get('/search/:country/:university/:major/:curr/:pp', SearchController.Search);
  // --------------------- End of Search Controller ------------ //




module.exports = router;