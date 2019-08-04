const mysqldb = require('../helpers/connectiontodb');

// checked
const saveComment = ({tweetId,userId,textMsg}) => {
    return new Promise ((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`insert into user_tweets_comments (tweet_id,user_id_by,comment_msg) values ('${tweetId}','${userId}','${textMsg}')`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

// checked
const deleteComment = ({tweetId,userId}) => {
    return new Promise ((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                connection.query(`delete from user_tweets_comments where tweet_id = '${tweetId}' and user_id_by = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

const deleteCommentsByTweetId = ({tweetId}) => {
    return new Promise ((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                connection.query(`delete from user_tweets_comments where tweet_id = '${tweetId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

const updateComment = ({tweetId,userId,textMsg}) => {
    return new Promise ((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                connection.query(`update user_tweets_comments set comment_msg='${textMsg}' where user_id_by = '${userId}' and tweet_id = '${tweetId}'`,(error) => {
                    if(error) reject('error while conecting db\n'+error);
                    resolve();
                });
            }
        });
    });
}

//your activity
const commentsByUserId = (userId) => {
    return new Promise ((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                connection.query(`select (tweet_id,comment_msg,comment_time) from user_tweets_comments where user_id_by = '${userId}' `,(error,result) => {
                    if(error) reject('error while conecting db\n'+error);
                    else if(result[0]==null) return resolve(null);
                    resolve(result[0]);
                });
            }
        });
    });
}

//comments msg + comment time + user-name
const commentsByTweetId = (tweetId) => {
    return new Promise ((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                const query = `select m.comment_msg,m.comment_time,
                               (select u.user_name from user as u where m.user_id_by = u.user_id) as name
                               from user_tweets_comment as m where m.tweet_id = '${tweetId}'`;
                connection.query(query,(error,result) => {
                    if(error) reject('error while conecting db\n'+error);
                    else if(result[0]==null) return sresolve(nulll);
                    resolve(result);
                });
            }
        });
    });
}

module.exports = {
    saveComment : saveComment,
    deleteComment : deleteComment,
    deleteCommentsByTweetId : deleteCommentsByTweetId,
    updateComment : updateComment,
    commentsByTweetId : commentsByTweetId,
    commentsByUserId : commentsByUserId
}







