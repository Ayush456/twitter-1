const queryTweet = require('../biz/queryTweet');
const queryUser = require('../biz/queryUser');
const queryFollow = require('../biz/queryFollow');
const queryHashtag = require('../biz/queryHashtag');

const newUser = {
    userId: '9',
    userName: 'Suraj Jha',
    userPassword: '12345',
    userPasswordHash: '123456789',
    userDob: '1998-05-03',
    userEmail: 'jha.suraj@gmail.com'
}

const test = async () => {
    try {
        // const result = await queryHashtag.getTweetByHashtag({hashTag:'food',lastTweetCount:0});
        const result = await queryUser.getUserById(({userId:"3"}));
        console.log(result);
        return;
    } catch (error) {
        console.log(error);
    }
}

test();