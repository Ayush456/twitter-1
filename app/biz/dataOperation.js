
//checked and using
const userToProfile = ({user_id,user_name,user_dob,user_pp,user_follow_count,user_follower_count,user_tweet_count,user_status,user_cp}) => {
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





module.exports = {
    userToProfile : userToProfile,
    hashTags : removeHashTags
}