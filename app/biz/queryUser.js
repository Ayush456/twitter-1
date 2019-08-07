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
                connection.query(`select * from user where user_id = '${userId}'`,(error,row) => {
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

const getUserByEmail = ({userEmail}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`select * from user where user_email = '${userEmail}'`,(error,row) => {
                    if(error) reject('error while executing query\n'+error);
                    else if(row.length==0) return resolve(false);
                    resolve(row[0]);
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

const updateUserProfile = ({userId,userStatus,userDob}) => {
    return new Promise((resolve,reject) => {
        mysqldb.getConnection((error,connection) => {
            if(error) reject('error while conecting db\n'+error);
            else {
                connection.query(`update user set user_status = '${userStatus}',user_dob = '${userDob}' where user_id = '${userId}'`,(error) => {
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
    getUserByEmail : getUserByEmail,
    getUserByName : getUserByName,
    updateUserPP : updateUserPP,
    updateUserCP : updateUserCP,
    updateUserProfile : updateUserProfile,
    increaseCount : increaseCount,
    decreaseCount : decreaseCount,
    deleteUser : deleteUser
}



