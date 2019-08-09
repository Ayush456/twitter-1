const mysql = require('mysql');

const mysqlDB = mysql.createPool({
    user: 'root',
    port: '3306',
    password: '',
    database: 'twitter',
    queueLimit: 1000,       // unlimited queueing
<<<<<<< HEAD
    connectionLimit: 0   // unlimited connections 
=======
    connectionLimit: 100   // unlimited connections 
>>>>>>> a7c76ca55f84f73f97963fefdd258cda048425af
});

module.exports = mysqlDB;

