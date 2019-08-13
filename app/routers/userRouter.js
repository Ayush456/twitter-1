const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const user = new UserController();
const userValidator = require('../validators/user.validator');
const upload = require('../helpers/multer');

router.post('/follow',userValidator.validate('follow'),user.follow);  // {userOne,userTwo};


router.post('/unfollow',userValidator.validate('unfollow'),user.unfollow);  // {userOne,userTwo};

router.post('/edit_profile',userValidator.validate('editProfile'),user.editProfile);  //{userId,userDob,userStatus};

router.put('/delete',userValidator.validate('deleteAccount'),user.deleteAccount);    //{userId}

router.post('/edit_pp',upload.pp.fields([{name:'upload',maxCount:1},{name:'userId',maxCount:1}]),user.editPP,(error,req,res,next) => {
    res.status(400).send({error : error.message });
});                //{userId,Image...} --

router.post('/edit_cp',upload.cp.fields([{name:'upload',maxCount:1},{name:'userId',maxCount:1}]),user.editCP,(error,req,res,next) => {
    res.status(400).send({error : error.message});
});                //{userId,Image....} --

router.post('/edit_p',user.editPro);

router.put('/change_password',userValidator.validate('changePassword'),user.changePassword); // {userId,oldPassword,newPassword};

module.exports = router;


