const mysql = require('mysql');

var mysqlDB = mysql.createPool({
    user: 'root',
    port: '3306',
    password: '1234',
    database: 'twitter',
    queueLimit: 0,       // unlimited queueing
    connectionLimit: 0   // unlimited connections 
});

module.exports = mysqlDB;

