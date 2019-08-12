const mysqldb = require('../helpers/connectiontodb');

//takes json user object
const createUser = ({userId,userName,userPassword,userPasswordHash,userDob,userEmail}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`insert into user (user_id,user_name,user_password,user_password_hash,user_dob,user_email,_isactive) values ('${userId}','${userName}','${userPassword}','${userPasswordHash}','${userDob}','${userEmail}','1')`,(error,result) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve(result);
                });
            }
        });
    });
}

//checked and using
const getUserById = ({userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select user_id,user_name,user_dob,user_email,_isactive,user_pp,user_cp,user_follow_count,user_follower_count,user_tweet_count,user_status,user_email from user where user_id = '${userId}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row.length==0) return resolve(false);
                    return resolve(row[0]);
                });
            }
        });
    });
}

const getUserByEmail = ({user_email}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select 1 from user where user_email = '${user_email}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row.length==0) return resolve(false);
                    return resolve(row[0]);
                });
            }
        });
    });
}

const getPasswordHash = ({userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select user_password_hash passwordHash from user where userId = '${userId}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row.length==0) return resolve(false);
                    return resolve(row[0]);
                });
            }
        });
    });

}

const getUserByName = ({key,offset}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select user_id userId,user_name userName,user_status userStatus,user_pp userPPPath from user where user_name = '${key}' order by userName limit ${offset},10`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    return resolve(row);
                });
            }
        });
    });
}

const login = ({user_email,passwordHash}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                const query = `select user_name,user_id,user_email from user where user_email='${user_email}' and user_password_hash='${passwordHash}'`
                connection.query(query,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    if(row.length == 0) return resolve(false);
                    return resolve(row[0]);
                });
            }
        });
    }); 
}

const signup = ({username,user_password,dob,user_email,userId,passwordHash}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                const query = `insert into user (user_id,user_name,user_password,user_password_hash,user_dob,user_email,_isactive) values ('${userId}','${username}','${user_password}','${passwordHash}','${dob}','${user_email}','1')`;
                connection.query(query,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    return resolve();
                });
            }
        });
    });
}

const updateUserPP = ({userId,picturePath}) => {
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
        });
    });
}

const updateUserCP = ({userId,picturePath}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_cp = '${picturePath}' where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

const updateUserProfile = ({userId,userStatus,userDob,userEmail}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_status = '${userStatus}',user_dob = '${userDob}',user_email = '${userEmail}' where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

const updatePasswordHash = ({userId,passwordHash}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_password_hash = '${passwordHash}' where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    }); 
}

const increaseCount = (column,{userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set ${column} = ${column}+1 where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

const decreaseCount = (column,{userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set ${column} = ${column}-1 where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}

const deleteUser = ({userId}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set _isactive = '0' where user_id = '${userId}'`,(error) => {
                    if(error) reject('error while executing query\n'+error);
                    resolve();
                });
            }
        });
    });
}


 
module.exports = {
    createUser : createUser,
    getUserById : getUserById,
    getUserByName : getUserByName,
    getUserByEmail : getUserByEmail,
    updateUserPP : updateUserPP,
    updateUserCP : updateUserCP,
    updatePasswordHash : updatePasswordHash,
    updateUserProfile : updateUserProfile,
    increaseCount : increaseCount,
    decreaseCount : decreaseCount,
    deleteUser : deleteUser,
    getPasswordHash : getPasswordHash,
    login : login,
    signup : signup
}



