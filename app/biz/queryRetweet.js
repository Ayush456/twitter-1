const mysqldb = require('../helpers/connectiontodb');

//checked
const saveRetweet = ({fromTweetId,tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting database\n'+error);
            else {
                connection.query(`insert into user_tweets_retweets (from_tweet_id,tweet_id) values ('${fromTweetId}','${tweetId}')`,(error,result) => {
                    connection.release();
                    if(error) reject('error while executing query\n'+error);
                    resolve(result);
                });
            }
        });
    });
}

const deleteRetweet = ({fromTweetId,tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting database\n'+error);
            else {
                connection.query(`delete from user_tweets_retweets where tweet_id = '${tweetId}' and from_tweet_id = '${fromTweetId}'`,(error) => {
                    connection.release();
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

//checked
const getFromTweet = ({tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting database\n'+error);
            else {
                connection.query(`select from_tweet_id from user_tweets_retweets where tweet_id = '${tweetId}'`,(error,result) => {
                    connection.release();
                    if(error) reject('error while executing query\n'+error);
                    if(result.length==0) return resolve(false);
                    resolve(result[0].from_tweet_id);
                });
            }
        });
    });  
}

//checked
const deleteRetweetsByTweetId = ({tweetId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting database\n'+error);
            else {
                connection.query(`delete from user_tweets_retweets where tweet_id = '${tweetId}'`,(error) => {
                    connection.release();
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    }); 
}

const retweetByTweetId = () => {

}



module.exports = {
    makeRetweetLog : saveRetweet,
    deleteRetweetLog : deleteRetweet,
    getFromTweet : getFromTweet,
    deleteRetweetsByTweetId : deleteRetweetsByTweetId,
    retweeteLogByTweetId : retweetByTweetId
}
