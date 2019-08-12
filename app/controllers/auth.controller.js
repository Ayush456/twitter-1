const queryUser = require('../biz/queryUser');
const utils = require('./../biz/utils');
const { validationResult } = require('express-validator');
class AuthController {

    login(req,res) { res.render('login',{data:null}); }
    
    async checkLoginReq(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }
            const data = req.body;
            const passwordHash = utils.generatePasswordHash(data.user_password);
            data.passwordHash = passwordHash;
            const user = await queryUser.login(data);
            if(user) return res.send(user);
            return res.send('Invalid login detalis')
        } catch(error) {
            return res.status(500).send(error);
        }
    }

    async signupReq(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }
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
            return res.status(500).send(error);
        }
    }

}

module.exports = AuthController;