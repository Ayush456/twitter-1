const queryUser = require('../biz/queryUser');
const utils = require('./../biz/utils');
const { validationResult } = require('express-validator');
class AuthController {
    
    async login(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) { return res.status(422).json({errors : errors.array() }); }
            
            const data = req.body;
            const user = await queryUser.getUserByEmail(data)
            if(user) {
                const passwordHash = utils.generatePasswordHash(data.user_password);
                if(passwordHash === user.user_password_hash) {
                    const token = await utils.generateToken(user);
                    return res.send(token);
                }
                return res.status(403).send("Invalid Password");
            }
            return res.status(403).send("Invalid Email");
        } catch(error) {
            console.log(error);
            return res.status(500).send();
        }
    }

    async signup(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

            const data = req.body;
            const isSigned = await queryUser.getUserByEmail(data);
            if(!isSigned) {
                data.passwordHash = utils.generatePasswordHash(data.user_password);
                data.user_id = utils.generateUserId(data.username);
                await queryUser.signup(data);
                const token = await utils.generateToken(data);
                return res.send(token);
            }
            return res.send('Email already exist');
        } catch(error) {
            console.log(error);
            return res.status(500).send();
        }
    }

}

module.exports = AuthController;