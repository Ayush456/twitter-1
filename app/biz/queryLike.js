const mysqldb = require('../helpers/connectiontodb');

//checked
const insertLike = ({userId,tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                connection.query(`insert into user_tweets_likes(tweet_id,user_id_by) values ('${tweetId}','${userId}')`,(error,result) => {
                    if(error)  reject('error while executing query\n'+error);
                    return resolve(result);
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
                    else if(result.length==0) return resolve(false);
                    return resolve(true);
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
                    return resolve();
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
                    return resolve();
                })
            }
        });
    }); 
}

//checked
const getLikedBy = ({tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                //select user_name from user where user_id in (
                connection.query(`select user_name from user where user_id in (select user_id_by from user_tweets_likes where tweet_id = '${tweetId}')`,(error,result) => {
                    if(error)  reject('error while executing query\n'+error);
                    else if(result.length==0) return resolve(false);
                    return resolve(result);
                })
            }
        });
    });
}

const getLikseOfFriends = ({userId,lastLikeCount}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                const query = `select u.user_name likedByName,utl.user_id_by likeById,v.user_name tweetByName,ut.user_id tweetById,ut.tweet_id as tweetId,ut.tweet_msg tweetMsg,ut.tweet_like_count likeCount,ut.tweet_retweet_count retweetCount,ut.tweet_comment_count,utl.atTime from user_tweets_likes as utl join user_tweets ut on ut.tweet_id = utl.tweet_id join user u on u.user_id = utl.user_id_by join user_followers uf on uf.user_id_2 = utl.user_id_by join user v on v.user_id = ut.user_id where uf.user_id_1 = 1 order by utl.atTime limit 0,20;`;
                connection.query(query,(error,result) => {
                    if(error)  reject('error while executing query\n'+error);
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
    getLiksOfFriends : getLikseOfFriends,
    getLikedBy : getLikedBy
}
