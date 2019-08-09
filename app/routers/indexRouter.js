var express = require('express');
var router = express.Router();
var mysqlDB = require('../helpers/connectiontodb');
var AuthContoller = require('../controllers/auth.controller.js');
let authController = new AuthContoller();




router.get('/',authController.login);

router.post('/login',authController.checkLoginReg);

router.get('/signup',(req,res) => {
    res.render('signUp');
});
// /user
router.post('/signup', authController.signupReq);



module.exports = router;
// font-family: 'Pacifico', cursive;
// font-family: 'Ma Shan Zheng', cursive;
// font-family: 'Kaushan Script', cursive;
// font-family: 'DM Serif Display', serif;
// font-family: 'Libre Caslon Display', serif;