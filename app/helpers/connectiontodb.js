const mysql = require('mysql');

const mysqlDB = mysql.createPool({
    user: 'root',
    port: '3306',
    password: '',
    database: 'twitter',
    queueLimit: 1000,       // unlimited queueing
    connectionLimit: 100   // unlimited connections 
});

module.exports = mysqlDB;

