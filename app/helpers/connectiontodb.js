const mysql = require('mysql');

const mysqlDB = mysql.createPool({
    user: 'root',
    port: '3306',
    database: 'twitter',
<<<<<<< HEAD
    queueLimit: 1,       // unlimited queueing
    connectionLimit: 100   // unlimited connections 
=======
    queueLimit: 1000,       // unlimited queueing
    connectionLimit: 1000,   // unlimited connections 
>>>>>>> 14fc98802963edb229a4e68aadaee96683caa908
});

module.exports = mysqlDB;

