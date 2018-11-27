var express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'), 
    authCtrl = require('../controllers/auth.controller'),
    mw = require('./middlewares');

//---------------------------- Authentication Routes --------------------------------//

//router.get('/verify/:id/:token', authCtrl.verifyMail);
router.post('/auth/register', mw.isNotAuthenticated, authCtrl.register);
router.post('/auth/login', mw.isNotAuthenticated, authCtrl.login);



module.exports = router;
