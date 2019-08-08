const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const user = new UserController();
const userValidator = require('../validators/user.validator');

//multer
const multer = require('multer');

const upload_pp = multer({
    dest : 'app/profile-picture',
    limit : {
        fileSize : 1000000, 
    },
    fileFilter(req,file,callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('please upload a jpg,jpeg,png image'));
        }
        callback(undefined,true);
    }
});

const upload_cp = multer({
    dest : 'app/cover-picture',
    limit : {
        fileSize : 1000000,
    },
    fileFilter(req,file,callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('please upload a jpg,jpeg,png image'));
        }
        callback(undefined,true);
    }
});

router.post('/follow',userValidator.validate('follow'),user.follow);  // {userOne,userTwo};

router.post('/unfollow',userValidator.validate('unfollow'),user.unfollow);  // {userOne,userTwo};

router.put('/edit_profile',userValidator.validate('editProfile'),user.editProfile);  //{userId,userDob,userStatus};

router.put('/delete',userValidator.validate('deleteAccount'),user.deleteAccount);    //{userId}

router.post('/edit_pp',upload_pp.fields([{name:'upload',maxCount:1},{name:'userId',maxCount:1}]),user.editPP,(error,req,res,next) => {
    res.status(400).send({error : error.message });
});                //{userId,userPP,...} --

router.post('/edit_cp',upload_cp.fields([{name:'upload',maxCount:1},{name:'userId',maxCount:1}]),user.editCP,(error,req,res,next) => {
    res.status(400).send({error : error.message});
});                //{userId....} --

// router.put('/change_password',userValidator.validate('changePassword'),user.changePassword); // {userId,oldPassword,newPassword};

module.exports = router;


