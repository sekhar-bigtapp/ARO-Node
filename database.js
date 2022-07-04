var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'arodashboard',
    user: 'root',
    password: 'Swarna@sri3'
});

module.exports = connection;