const mysql = require('mysql');

const mysqlDB = mysql.createPool({
    user: 'root',
    port: '3306',
    password: '',
    database: 'twitter',
    queueLimit: 0,       // unlimited queueing
    connectionLimit: 0   // unlimited connections 
});

module.exports = mysqlDB;

