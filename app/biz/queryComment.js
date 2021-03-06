const mysqldb = require('../helpers/connectiontodb');

// checked
const saveComment = ({tweetId,userId,textMsg}) => {
    return new Promise ((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`insert into user_tweets_comments (tweet_id,user_id_by,comment_msg) values ('${tweetId}','${userId}','${textMsg}')`,(error,result) => {
                    connection.release();
                    if(error) reject('error while executing query\n'+error);
                    resolve(result);
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
                    connection.release();
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
                    connection.release();
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
                    connection.release();
                    if(error) reject('error while conecting db\n'+error);
                    resolve();
                });
            }
        });
    });
}

// tweetId + comments msg + comment time + user-name
const commentsByTweetId = ({tweetId}) => {
    return new Promise ((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting db\n'+error);
            else {
                const query = `
                select m.tweet_id as tweetId,m.comment_msg as comment,m.atTime as time,(select u.user_name from user as u where m.user_id_by = u.user_id) as name from user_tweets_comments as m where m.tweet_id = '${tweetId}' order by time limit 20`;
                connection.query(query,(error,result) => {
                    connection.release();
                    if(error) reject('error while conecting db\n'+error);
                    if(result.length==0) return resolve(false);
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
    commentsByTweetId : commentsByTweetId
}







