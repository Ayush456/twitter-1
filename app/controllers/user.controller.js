const queryFollow = require('../biz/queryFollow');
const { validationResult } = require('express-validator/check');
class UserController {

    async follow(req,res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }
            const data = req.body;
            const result = await queryFollow.isFollowing(data);
            if(result) return res.send();
            await queryFollow.startFollowing(data);
            res.send();
        } catch(error) {
            res.status(500).send(error);
        }
    }

    async unfollow(req,res) {
        try {
            const data = JSON.parse(req.params.data);
            const result = await queryFollow.isFollowing(data);
            if(result) await queryFollow.stopFollowing(data);
            res.send(); 
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
