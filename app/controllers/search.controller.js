const queryUser = require('../biz/queryUser');
const queryHashtag = require('../biz/queryHashtag');
const dataOperation = require('../biz/utils');

class Search {

    async getList(req,res) {
        dataOperation.addToResponse(res);
        try {
            dataOperation.validateRequest(req);

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