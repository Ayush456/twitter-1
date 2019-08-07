const queryUser = require('../biz/queryUser');
const queryHashtag = require('../biz/queryHashtag');
const { validationResult } = require('express-validator');

class Search {

    async getList(req,res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(422).json({errors : errors.array() });
            }

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
            return res.status(500).sendfile(error);
        }

    }
}

module.exports = Search;