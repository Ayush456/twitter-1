// const { validationResult } = require('express-validator');
const fs = require('fs');
const sha1 = require('sha1');

const shortid = require('shortid');

const userToProfile = ({user_id,user_name,user_dob,user_pp,user_follow_count,user_follower_count,user_tweet_count,user_status,user_cp,user_email}) => {
    let userProfile = {};
    userProfile.userId = user_id;
    userProfile.userName = user_name;
    let all = (user_dob+"").trim().split(" ");
    userProfile.dob = `${all[1]} ${all[2]} ${all[3]}`;
    userProfile.followCount = user_follow_count;
    userProfile.followerCount = user_follower_count;
    userProfile.tweetCount = user_tweet_count;
    userProfile.status = user_status;
    userProfile.ppPath = user_pp;
    userProfile.cpPath = user_cp;
    userProfile.email = user_email;
    return(userProfile);
}

const removeHashTags = (data) => {
    data.textMsg = data.textMsg.trim();
    data.hashTags = data.textMsg.split('#');
    for(let index in data.hashTags){
        data.hashTags[index] = data.hashTags[index].trim();
    }
    data.hashTags.shift();
} 

const addToResponse = (res) => {
    return new Promise((resolve,reject) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
        resolve(res);
    })

}

const deleteFile = (picturePath) => {
    fs.unlinkSync(picturePath);
    return;
}

const generatePasswordHash = (password) => {return sha1(password)};


const generateUserId = (userName) =>{
    return userName + shortid.generate();
}



module.exports = {
    userToProfile : userToProfile,
    deleteFile : deleteFile,
    hashTags : removeHashTags,
    addToResponse : addToResponse,
    generatePasswordHash : generatePasswordHash,
    generateUserId : generateUserId,
}