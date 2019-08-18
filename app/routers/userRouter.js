const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const user = new UserController();
const userValidator = require('../validators/user.validator');
const upload = require('../helpers/multer');
const utils = require('../biz/utils');

router.post('/follow',utils.verifyToken,userValidator.validate('follow'),user.follow);  // {userOne,userTwo};

router.post('/unfollow',utils.verifyToken,userValidator.validate('unfollow'),user.unfollow);  // {userOne,userTwo};

router.post('/edit_profile',utils.verifyToken,userValidator.validate('editProfile'),user.editProfile);  //{userId,userDob,userStatus};

router.put('/delete',utils.verifyToken,userValidator.validate('deleteAccount'),user.deleteAccount);    //{userId}

router.post('/edit_pp',utils.verifyToken,upload.pp.fields([{name:'upload',maxCount:1},{name:'userId',maxCount:1}]),user.editPP,(error,req,res,next) => {
    res.status(400).send({error : error.message });
});                //{userId,Image...} --

router.post('/edit_cp',utils.verifyToken,upload.cp.fields([{name:'upload',maxCount:1},{name:'userId',maxCount:1}]),user.editCP,(error,req,res,next) => {
    res.status(400).send({error : error.message});
});                //{userId,Image....} --

router.put('/change_password',utils.verifyToken,userValidator.validate('changePassword'),user.changePassword); // {userId,oldPassword,newPassword};

module.exports = router;


