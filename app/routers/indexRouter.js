const express = require('express');
const router = express.Router();
const AuthContoller = require('../controllers/auth.controller.js');
const authController = new AuthContoller();
const authValidator = require('../validators/auth.validator');



router.get('/',authController.login);

router.post('/login',authValidator.validate('checkLoginReq'),authController.checkLoginReq);

router.get('/signup',(req,res) => { res.render('signUp'); });

// /user
router.post('/signup',authValidator.validate('signupReq'),authController.signupReq);



module.exports = router;
// font-family: 'Pacifico', cursive;
// font-family: 'Ma Shan Zheng', cursive;
// font-family: 'Kaushan Script', cursive;
// font-family: 'DM Serif Display', serif;
// font-family: 'Libre Caslon Display', serif;