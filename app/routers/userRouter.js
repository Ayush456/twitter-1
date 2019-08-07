const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const user = new UserController();
const userValidator = require('../validators/user.validator');
// const { check , validationResult } = require('express-validator');

router.post('/follow',userValidator.validate('follow'),user.follow);  // {userOne,userTwo};

router.post('/unfollow/:data',userValidator.validate('unfollow'),user.unfollow);  // {userOne,userTwo};

router.put('/edit_profile/:data',userValidator.validate('editProfile'),user.editProfile);  //{userId,userDob,userStatus};

// router.put('/edit_pp/:data',user.editPP);           //{userId,userPP,...} --

// router.put('/edit_cp/:data',user.editCP);           //{userId....} --

router.put('/change_password/:data',userValidator.validate('changePassword'),user.changePassword); // {userId,oldPassword,newPassword};

module.exports = router;


