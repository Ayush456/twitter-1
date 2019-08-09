const queryUser = require('../biz/queryUser');
const utils = require('./../biz/utils');

class AuthController {

    login(req,res) { res.render('login',{data:null}); }
    
    async checkLoginReg(req,res) {
        utils.addToResponse(res); 
        try {
            const data = req.body;
            const passwordHash = utils.generatePasswordHash(data.user_password);
            data.passwordHash = passwordHash;
            const user = await queryUser.login(data);
            if(user) return res.send(user);
            return res.send('Invalid login detalis')
        } catch(error) {
            return res.status(500).sendfile(error);
        }
    }

    async signupReq(req,res) {
        utils.addToResponse(res);
        try {
            const data = req.body;
            const isSigned = await queryUser.getUserByEmail(data);
            if(!isSigned) {
                const passwordHash = utils.generatePasswordHash(data.user_password);
                const userId = utils.generateUserId(data.username);
                data.userId = userId;
                data.passwordHash = passwordHash;
                await queryUser.signup(data);
                delete data.passwordHash,data.user_password;
                return res.send({ insertStatus: '1', user:data, user_id: userId });
            }
            return res.send('Email already exist');
        } catch(error) {
            return res.status(500).sendfile(error);
        }
    }

}

module.exports = AuthController;