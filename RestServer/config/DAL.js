var mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tin',
    database: 'tin'
})
module.exports = connection;