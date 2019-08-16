const mysqldb = require('../helpers/connectiontodb');

//checked
const getFollowers = ({userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                const query = `select user_name as userName,user_id as userId  from user u join user_followers uf on u.user_id = uf.user_id_1 where uf.user_id_2 = '${userId}' order by atTime desc limit 10`;
                connection.query(query,(error,row) => {
                    connection.release();
                    console.log(row);
                    if(error) reject('error while executing query\n'+error);
                    if(row.length==0) return resolve(false);
                    resolve(row);
                });
            }
        })
    });
}

// checked
const getFollowings = ({userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) return reject('error while conecting db\n'+error);
            else {
                const query = `select user_name as userName,user_id as userId  from user u join user_followers uf on u.user_id = uf.user_id_2 where uf.user_id_1 = '${userId}' order by atTime desc limit 10`
                connection.query(query,(error,row) => {
                    connection.release();
                    if(error) return reject('error while executing query\n'+error);
                    if(row.length==0) return resolve(false);
                    return resolve(row);
                });
            }
        })
    });
}

// checked
const isFollowed = ({userOne,userTwo}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select 1 from user_followers where user_id_2 = '${userOne}' and user_id_1 = '${userTwo}'`,(error,row) => {
                    connection.release();
                    if(error) reject('error while executing query\n'+error);
                    else if(row.length==0) return resolve(false);
                    return resolve(true);
                });
            }
        })
    });
}

//checked
const isFollowing = ({userOne,userTwo}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select 1 from user_followers where user_id_1 = '${userOne}' and user_id_2 = '${userTwo}'`,(error,row) => {
                    connection.release();
                    if(error) reject('error while executing query\n'+error);
                    else if(row.length==0) return resolve(false);
                    resolve(true);
                });
            }
        })
    });
}

//checked
const startFollowing  = ({userOne,userTwo}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`insert into user_followers(user_id_1,user_id_2) values ('${userOne}','${userTwo}')`,(error,result) => {
                    connection.release();
                    if(error) reject('error while executing query\n'+error);
                    resolve(result);
                });
            }
        })
    });
}

//checked
const stopFollowing  = ({userOne,userTwo}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`delete from user_followers where user_id_1 = '${userOne}' and user_id_2 = '${userTwo}'`,(error,row) => {
                    connection.release();
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}

module.exports = {
    getFollowers : getFollowers,
    getFollowings : getFollowings,
    isFollowed : isFollowed,
    isFollowing : isFollowing,
    startFollowing : startFollowing,
    stopFollowing : stopFollowing
}