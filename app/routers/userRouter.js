const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const user = new UserController();

router.post('/follow/:data',user.follow);                   //{userOne,userTwo};

router.post('/unfollow/:data',user.unfollow);               //{userOne,userTwo};

router.put('/edit_profile/:data',user.editProfile);         //{userId,userDob,userStatus};

// router.put('/edit_pp/:data',user.editPP);                //{userId,userPP,...} --

// router.put('/edit_cp/:data',user.editCP);                //{userId....} --

router.put('/change_password/:data',user.changePassword);   //{userId,oldPassword,newPassword};

module.exports = router;


