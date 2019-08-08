const queryFollow = require('../biz/queryFollow');
const queryUser = require('../biz/queryUser');
const utils = require('../biz/utils');
class UserController {

    async follow(req,res) {
        dataOperation.addToResponse(res);
        try {
            dataOperation.validateRequest(req);

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
        dataOperation.addToResponse(res);
        try {
            dataOperation.validateRequest(req);

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
        dataOperation.addToResponse(res);
        try {
            dataOperation.validateRequest(req);
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
        dataOperation.addToResponse(res);
        try {
            dataOperation.validateRequest(req);

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
        dataOperation.addToResponse(res);
        try {
            dataOperation.validateRequest(req);

            

            return res.send();
        } catch(error) {
            return res.status(500).send();
        }
    }

    async editPP(req,res) {
        utils.addToResponse(res);
        try {
            const data = {"userId" : req.body.userId,"picturePath" : req.files.upload[0].path};
            const user = await queryUser.getUserById(data);
            if(user) {
                await queryUser.updateUserPP(data);
                if(user.user_pp != null) utils.deleteFile(user.user_pp);
                return res.send();
            }
            return res.status(418).send();   
        } catch(error) {
            return res.status(500).send(error);
        }
    }

    async editCP(req,res) {
        utils.addToResponse(res);
        try {
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
