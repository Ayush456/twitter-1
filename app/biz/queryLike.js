const mysqldb = require('../helpers/connectiontodb');

//checked
const insertLike = ({userId,tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                connection.query(`insert into user_tweets_likes(tweet_id,user_id_by) values ('${tweetId}','${userId}')`,(error) => {
                    if(error)  reject('error while executing query\n'+error);
                    resolve();
                })
            }
        });
    });
}

//checked
const isLiked = ({userId,tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                connection.query(`select 1 from user_tweets_likes where user_id_by = '${userId}' and tweet_id = '${tweetId}'`,(error,result) => {
                    if(error)  reject('error while executing query\n'+error);
                    else if(result[0]==null) return resolve(false);
                    resolve(true);
                })
            }
        });
    });
}

//checked
const deleteLike = ({userId,tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                connection.query(`delete from user_tweets_likes where user_id_by = '${userId}' and tweet_id = '${tweetId}'`,(error) => {
                    if(error)  reject('error while executing query\n'+error);
                    resolve();
                })
            }
        });
    });
}

//checked
const deleteLikebyTweetId = ({tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                connection.query(`delete from user_tweets_likes where tweet_id = '${tweetId}'`,(error) => {
                    if(error)  reject('error while executing query\n'+error);
                    resolve();
                })
            }
        });
    }); 
}

//checked
const getLikedByTweetId = ({tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                //select user_name from user where user_id in (
                connection.query(`select user_name from user where user_id in (select user_id_by from user_tweets_likes where tweet_id = '${tweetId}')`,(error,result) => {
                    if(error)  reject('error while executing query\n'+error);
                    else if(result[0]==null) return resolve(null);
                    resolve(result);
                })
            }
        });
    });
}

module.exports = {
    insertLike : insertLike,
    isLiked : isLiked,
    deleteLike : deleteLike,
    deleteLikebyTweetId : deleteLikebyTweetId,
    getLikedByTweetId : getLikedByTweetId
}
