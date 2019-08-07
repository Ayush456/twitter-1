const queryFollow = require('../biz/queryFollow');
const queryUser = require('../biz/queryUser');
const { validationResult } = require('express-validator');
class UserController {

    async follow(req,res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
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
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

            return res.send();
        } catch(error) {
            return res.status(500).send();
        }
    }

}

module.exports = UserController;
