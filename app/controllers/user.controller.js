const queryFollow = require('../biz/queryFollow');
const queryUser = require('../biz/queryUser');
const { validationResult } = require('express-validator/check');
class UserController {

    async follow(req,res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

            const data = JSON.parse(req.body);
            const user1 = queryUser.getUserById({userId:data.userOne});
            const user2 = queryUser.getUserById({userId:data.userTwo});
            if(user1._isactive && user2._isactive) {
                const result = await queryFollow.isFollowing(data);
                if(result) return res.send();
                await queryFollow.startFollowing(data);
                return res.send();
            }
            return res.status(418).send();
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async unfollow(req,res) {
        try {
            const data = JSON.parse(req.params.data);
            const user1 = queryUser.getUserById({userId:data.userOne});
            const user2 = queryUser.getUserById({userId:data.userTwo});
            if(user1._isactive && user2._isactive) {
                const result = await queryFollow.isFollowing(data);
                if(result) await queryFollow.stopFollowing(data);
                return res.send();
            }
            return res.status(418).send();
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async editProfile(req,res) {
        try {

        } catch(error) {
            res.status(500).send();
        }
    }

    async changePassword(req,res) {
        try {


        } catch(error) {
            res.status(500).send();
        }
    }

}

module.exports = UserController;
