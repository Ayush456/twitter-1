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
                    else if(row[0]==null) return reject('tweet does not exist');
                    resolve(row[0]);
                });
            }
        });
    });  
}

const getTweetsLikedBy = ({userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) return reject('error while conncting db\n'+error);
            else {
                const query = `select * from user_tweets as ut join user_tweets_likes as utc on ut.tweet_id=utc.tweet_id where utc.user_id_by = '${userId}'`;
                connection.query(query,(error,row) => {
                    if(error) return reject('error while executing query\n'+error);
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
                    else if(row[0]==null) return resolve(undefined);
                    resolve (row[0]);
                })
            }
        })
    });
} 

const getTweetByUserId = ({userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) return reject('error while connecting db\n'+ error);
            else {
                connection.query(`select * from user_tweets where user_id = '${userId}'`,(error,row) => {
                    if(error) return reject('error while executing query\n'+error);
                    resolve(row);
                })
            }
        })
    });
}

// takes userId array // where in
const getTweetsByUserIds = (userIds) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+ error);
            else {
                let user = '\'';
                userIds.forEach(element => user = user+element+'\',\'')
                user.splice(-2,2);
                console.log(user);
                connection.query(`select * from user_tweets where user_id in (${user})`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row[0]==null) return resolve(null);
                    resolve (row[0]);
                })
            }
        })
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
    getTweetsByUserIds : getTweetsByUserIds,
    increaseCount : increaseCount,
    decreaseCount : decreaseCount,
    markRetweeted : markRetweeted,
    unmarkRetweeted : unmarkRetweeted
}