const mysqldb = require('../helpers/connectiontodb');

const getFollowersById = (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select user_id_2 from user_followers where user_id_1 = '${userId}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row[0]==null) return resolve(null);
                    resolve(row);
                });
            }
        })
    });
}

const getFollowedById = (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select user_id_1 from user_followers where user_id_2 = '${userId}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row[0]==null) return resolve(null);
                    resolve(row);
                });
            }
        })
    });
}

const isConnected = (userOne,userTwo) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select * from user_followers where user_id_1 = '${userOne}' and user_id_2 = '${userTwo}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row[0]==null) return resolve(false);
                    resolve(true);
                });
            }
        })
    });
}

module.exports = {
    getFollowersByUserId : getFollowersById,
    getFollowedById : getFollowedById,
    isConnected : isConnected
}