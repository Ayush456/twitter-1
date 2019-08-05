const queryFollow = require('../biz/queryFollow');

class UserController {

    async follow(req,res) {
        try {
            const data = JSON.parse(req.params.data);
            console.log(data);
            const result = await queryFollow.isFollowing(data);
            console.log(result);
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
