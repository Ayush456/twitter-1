const mysqldb = require('../helpers/connectiontodb');

const getFollowersById = async (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select user_id_2 from user_followers where user_id_1 = '${userId}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row[0]==null) resolve(null);
                    resolve(row);
                });
            }
        })
    });
}

const getFollowedById = async (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select user_id_1 from user_followers where user_id_2 = '${userId}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row[0]==null) resolve(null);
                    resolve(row);
                });
            }
        })
    });
}

module.exports = {
    getFollowersByUserId : getFollowersById,
    getFollowedById : getFollowedById
}