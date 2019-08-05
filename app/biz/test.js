const queryTweet = require('../biz/queryTweet')

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
        const result = await queryTweet.saveTweet({userId : 1,textMsg : "hi buddy"});
        console.log(result);
        return;
    } catch (error) {
        console.log(error);
    }
}

test();