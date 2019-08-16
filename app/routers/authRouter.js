const express = require('express');
const router = express.Router();
const AuthContoller = require('../controllers/auth.controller.js');
const auth = new AuthContoller();
const authValidator = require('../validators/auth.validator');

router.post(['','/','/login'],authValidator.validate('login'),auth.login);

router.post('/signup',authValidator.validate('signup'),auth.signup);



module.exports = router;
