const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'root',
    password: 'sqllentesedmundo',
    database: 'usuarios'
  });
  
  

module.exports = {
    connection
}