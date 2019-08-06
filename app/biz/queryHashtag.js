const mysqldb = require('../helpers/connectiontodb');

const insertHashTags = ({tweetId,hashTags}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject ('error while connecting to db\n'+error);
            else {
                if(hashTags.length != 0) {
                    let hashtag = '';
                    hashTags = [...new Set(hashTags)];
                    hashTags.forEach(element => {
                        hashtag = hashtag+'('+"'"+element+"','"+tweetId+"'),";
                    });
                    hashtag = hashtag.substring(0,hashtag.length-1);
                    const query = `insert into user_tweets_hashtag(hash_tag,tweet_id) values ${hashtag}`;
                    connection.query(query,(error) => {
                        if(error) reject ('error while executing query\n'+error);
                    });
                }
                return resolve();
            }
        });
    });
}

const deleteHashTags = ({tweetId}) => {
    return new Promise ((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting to db\n'+error);
            else {
                const query = `delete from user_tweets_hashtag where tweet_id = '${tweetId}'`;
                connection.query(query,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

const getTweetByHashtag = ({hashTag,lastTweetCount}) => {
    return new Promise ((resolve,rejec) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while connecting to db\n'+error);
            else {
                const query = `select ut.tweet_id as tweetId,ut.user_id as userId,u.user_name as userName,tweet_msg as tweetText,tweet_like_count as likes,tweet_comment_count as comments,tweet_retweet_count as retweets,ut.atTime from user_tweets as ut join user_tweets_hashtag as uth on ut.tweet_id = uth.tweet_id join user as u on u.user_id = ut.user_id where uth.hash_tag = '${hashTag}' order by ut.atTime limit ${lastTweetCount},10`;
                connection.query(query,(error,result) => {
                    if(error) reject('error while executing query\n'+error);
                    if(result.length==0) return resolve(false);
                    return resolve(result);
                });
            }
        });
    });
}


module.exports = {
    insertHashTags : insertHashTags,
    deleteHashTags : deleteHashTags,
    getTweetByHashtag : getTweetByHashtag
}