const mysql = require('mysql');

const mysqlDB = mysql.createPool({
    user: 'root',
    port: '3306',
    database: 'twitter',
    queueLimit: 1,       // unlimited queueing
    connectionLimit: 100   // unlimited connections 
});

module.exports = mysqlDB;

