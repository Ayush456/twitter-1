const mysqldb = require('../helpers/connectiontodb');

//takes json user object
const createUser = ({userId,userName,userPassword,userPasswordHash,userDob,userEmail}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {

                connection.query(`insert into user (user_id,user_name,user_password,user_password_hash,user_dob,user_email,_isactive) values ('${userId}','${userName}','${userPassword}','${userPasswordHash}','${userDob}','${userEmail}','1')`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}

const getUserById = (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select * from user where user_id = '${userId}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row[0]==null) resolve(null);
                    resolve(row[0]);
                });
            }
        })
    });
}

const getUserByEmail = (userEmail) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select * from user where user_email = '${userEmail}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row[0]==null) resolve(null);
                    resolve(row[0]);
                });
            }
        })
    });
}

const updateUserProfile = (userId,picturePath) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                console.log(`update user set user_pp = '${picturePath}' where user_id = '${userId}'`);
                connection.query(`update user set user_pp = '${picturePath}' where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}

const updateUserCover = (userId,picturePath) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_cp = '${picturePath}' where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}

const updateUserStatus = (userId,newStatus) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_status = '${newStatus}' where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}

const increaseFollowCount = (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_follow_count = user_follow_count+1 where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}

const decreaseFollowCount = (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_follow_count = user_follow_count-1 where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}

const increaseFollowerCount = (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_follower_count = user_follower_count+1 where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });

}

const decreaseFollowerCount = (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_follower_count = user_follower_count-1 where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}

const increaseTweetCount = (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_tweet_count = user_tweet_count+1 where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}

const decreaseTweetCount = (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_tweet_count = user_tweet_count-1 where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}

const deleteUser = (userId) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set _isactive = '0' where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        })
    });
}
 
module.exports = {
    createUser : createUser,
    getUserById : getUserById,
    getUserByEmail : getUserByEmail,
    UpdateUserProfile : updateUserProfile,
    updateUserCover : updateUserCover,
    updateUserStatus : updateUserStatus,
    increaseFollowCount : increaseFollowCount,
    decreaseFollowCount : decreaseFollowCount,
    increaseFollowerCount : increaseFollowerCount,
    decreaseFollowerCount : decreaseFollowerCount,
    increaseTweetCount : increaseTweetCount,
    decreaseTweetCount : decreaseTweetCount,
    deleteUser : deleteUser
}



