// Obtém o cliente
const mysql = require('mysql2');

// Cria a conexão com o Banco de Dados
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'sqllentesedmundo',
  database: 'usuarios'
});

module.exports = {
  connection
}