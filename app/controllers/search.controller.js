const queryUser = require('../biz/queryUser');
const queryHashtag = require('../biz/queryHashtag');
const utils = require('../biz/utils');
const { validationResult } = require('express-validator');
const mysqldb = require('./../helpers/connectiontodb');

class Search {

    async getList(req,res) {
        try {
            res = await utils.addToResponse(res); 
            const errors = validationResult(req);
            if(!errors.isEmpty()) return res.status(422).json({errors : errors.array() });
            const data = req.body;
            if(data.key.charAt(0) == "#") {
                data.key = data.key.slice(1,data.key.length);
                const hashtags = await queryHashtag.getTweetByHashtag(data)
                const result = {"hashTags" : hashtags,"offset" : data.offset + hashtags.length};
                return res.send(result);
            } else {
                const user = await queryUser.getUserByName(data);
                const result = {"users" : user,"offset" : data.offset + user.length};
                return res.send(result);
            }
        } catch(error) {
            console.log(error);
            return res.status(500).sendfile("interval server error");
        }
    }

    getUsers(req,res){
        let user_name = req.body.user_name;

        mysqldb.getConnection((err,connection)=>{
            if(err) throw err;
            else{
             connection.query(`select user_id,user_name from user where user_name like '%${user_name}%' `,[user_name],(err,result)=>{
                return res.status(200).send(result);
             });
            }
        });
    }
}

module.exports = Search;