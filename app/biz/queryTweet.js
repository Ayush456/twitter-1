const mysqldb = require('../helpers/connectiontodb');

//checked
const saveTweet = ({userId,textMsg}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`insert into user_tweets (tweet_msg,user_id) values ('${textMsg}','${userId}')`,(error,result) => {
                    if(error) reject('error while executing query\n'+error);
                    return resolve(result);
                });
            }
        });
    });
}

//checked
const markRetweeted = ({tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user_tweets set _isRetweeted = '1' where tweet_id = '${tweetId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

// checked
const unmarkRetweeted = ({tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user_tweets set _isRetweeted = '0' where tweet_id = '${tweetId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

//checked
const getTweet = ({tweetId,userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+ error);
            else {
                connection.query(`select * from user_tweets where tweet_id = '${tweetId}' and user_id = '${userId}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    if(row.length == 0) return resolve(false);
                    return resolve(row[0]);
                });
            }
        });
    });  
} 

// checked
const getTweetsLikedBy = ({userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) return reject('error while conncting db\n'+error);
            else {
                const query = `select * from user_tweets as ut join user_tweets_likes as utc on ut.tweet_id = utc.tweet_id where utc.user_id_by order by ut.atTime desc = '${userId}'`;
                connection.query(query,(error,row) => {
                    if(error) return reject('error while executing query\n'+error);
                    if(row.length==0) return resolve(false);
                    return resolve(row);
                });
            }
        })
    })
}

//checked
const getTweetById = ({tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+ error);
            else {
                connection.query(`select * from user_tweets where tweet_id = '${tweetId}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row.length == 0) return resolve(false);
                    resolve (row[0]);
                })
            }
        })
    });
} 

// checked
const getTweetByUserId = ({userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) return reject('error while connecting db\n'+ error);
            else {
                connection.query(`select * from user_tweets where user_id = '${userId}' order by atTime DESC`,(error,row) => {
                    if(error) return reject('error while executing query\n'+error);
                    if(row.length == 0) return resolve(false);
                    resolve(row);
                })
            }
        })
    });
}


const getTweetsOfFriends = ({userId,lastTweetCount}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+ error);
            else {
                const query = `select tweet_id as tweetId,ut.user_id as userId,u.user_name as userName,tweet_msg as tweetText,tweet_like_count as likes,tweet_comment_count as comments,tweet_retweet_count as retweets,ut.atTime from user_tweets as ut join user_followers as uf on ut.user_id = uf.user_id_2 join user as u on u.user_id = uf.user_id_2 where uf.user_id_1 = '${userId}' order by ut.atTime limit ${lastTweetCount},10`;
                connection.query(query,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve (row);
                });
            }
        });
    });
}

//checked
const updateTweet = ({tweetId,userId,textMsg}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user_tweets set tweet_msg='${textMsg}',_isEDITED='1',tweet_like_count=0 where tweet_id = '${tweetId}' and user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

//checked
const increaseCount = (column,{tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user_tweets set ${column}=${column}+1 where tweet_id = '${tweetId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

//checked
const decreaseCount = (column,{tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user_tweets set ${column}=${column}-1 where tweet_id = '${tweetId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

//checked
const deleteTweet = ({tweetId,userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`delete from user_tweets where tweet_id = '${tweetId}' and user_id = '${userId}'`,(error,result) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

module.exports = {
    saveTweet : saveTweet,
    updateTweet : updateTweet,
    deleteTweet : deleteTweet,
    getTweet : getTweet,
    getTweetsLikedBy : getTweetsLikedBy,
    getTweetById : getTweetById,
    getTweetByUserId : getTweetByUserId,
    getTweetsOfFriends : getTweetsOfFriends,
    increaseCount : increaseCount,
    decreaseCount : decreaseCount,
    markRetweeted : markRetweeted,
    unmarkRetweeted : unmarkRetweeted
}