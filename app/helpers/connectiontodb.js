const mysql = require('mysql');

var mysqlDB = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'project_db',
    queueLimit: 0, // unlimited queueing
    connectionLimit: 0 // unlimited connections 
});

module.exports = mysqlDB;
