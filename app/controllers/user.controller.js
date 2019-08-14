const queryFollow = require('../biz/queryFollow');
const queryUser = require('../biz/queryUser');
const utils = require('../biz/utils');
const { validationResult } = require('express-validator');
const mysqldb = require('./../helpers/connectiontodb');
class UserController {

    async follow(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).send(errors);
            }

            const data = req.body;
            const user1 = await queryUser.getUserById({userId:data.userOne});
            const user2 = await queryUser.getUserById({userId:data.userTwo});
            if(user1._isactive && user2._isactive) {
                const result = await queryFollow.isFollowing(data);
                if(result) return res.send();
                await queryFollow.startFollowing(data);
                return res.send();
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).sendfile(error);
        }
    }

    async unfollow(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

            const data = req.body;
            const user1 = await queryUser.getUserById({userId:data.userOne});
            const user2 = await queryUser.getUserById({userId:data.userTwo});
            if(user1._isactive && user2._isactive) {
                const result = await queryFollow.isFollowing(data);
                if(result) await queryFollow.stopFollowing(data);
                return res.send();
            }
            return res.status(418).send();
        } catch (error) {
            return res.status(500).send(error);
        }
    }

    async editProfile(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

            const data = req.body;
            const user = await queryUser.getUserById(data);
            if(user && user._isactive) {
                await queryUser.updateUserProfile(data);
                return res.send();
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send();
        }
    }

    async deleteAccount(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

            const data = req.body;
            const user = await queryUser.getUserById(data);
            if(user && user._isactive) {
                await queryUser.deleteUser(data);
                // logout
                return res.send();
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send();
        }
    }

    async changePassword(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

            const data = req.body;
            const user = await queryUser.getUserById(data);
            if(user) {
                const oldPasswordHash = utils.generatePasswordHash(data.oldPassword);
                const passwordHash = await queryUser.getPasswordHash(data);
                if(oldPasswordHash == passwordHash) {
                    const newPasswordHash = utils.generatePasswordHash(data.newPassword);
                    data.passwordHash = newPasswordHash;
                    await queryUser.updatePasswordHash(data);
                    res.send('password changed');
                }
                return res.status(200).send('please use correct old password');
            }
            return res.status(418).send();
        } catch(error) {
            return res.status(500).send();
        }
    }

    async editPP(req,res) {
        try {
            res = await utils.addToResponse(res); 
            // console.log(req.body);
            // console.log(req.files);
            // console.log(req);
            const data = {"userId" : req.body.userId,"picturePath" : req.files.upload[0].path};
            const user = await queryUser.getUserById(data);
            // console.log(data);
            if(user) {
                await queryUser.updateUserPP(data);
                if(user.user_pp != null) utils.deleteFile(user.user_pp);
                return res.send();
            }
            return res.status(418).send();   
        } catch(error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

    async editCP(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const data = {"userId" : req.body.userId,"picturePath" : req.files.upload[0].path};
            const user = await queryUser.getUserById(data);
            if(user) {
                await queryUser.updateUserCP(data);
                if (user.user_cp != null)utils.deleteFile(user.user_cp);
                return res.send();
            }
            return res.status(418).send();    
        } catch(error) {
            return res.status(500).send(error);
        }
    }
}

module.exports = UserController;
