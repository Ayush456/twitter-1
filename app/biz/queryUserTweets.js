const mysqldb = require('../helpers/connectiontodb');

const saveTweet = (userId,tweetMsg) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`insert into user_tweets (tweet_msg,user_id) values ('${tweetMsg}','${userId}')`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

const getTweetById = (tweetId) => {

}

const getTweetByUserId = (userId) => {

}

// takes userId array // where in
const getTweetsByUserIds = (userIds) => {

}

const editTweet = (tweetId,tweetMsg) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user_tweets set tweet_msg='${tweetMsg}',_isEDITED='1',tweet_edit_time='current_timestamp()',tweet_like_count=0,tweet_retweet_count=0,tweet_comment_count=0 where tweet_id = '${tweetId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

module.exports = {
    saveTweet : saveTweet,
    editTweet : editTweet
}