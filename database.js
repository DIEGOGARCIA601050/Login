// Obtém o cliente
const mysql = require('mysql2/promise');

class Config {
  constructor(host, port, user, password, database) {
    if(Config.instance) {
      return Config.instance
    } else {
    Config.instance = this
    this.host = host,
    this.port = port,
    this.user = user,
    this.password = password,
    this.database = database
  }
  }
}
const config = new Config('localhost', 3306, 'root', 'sqllentesedmundo', 'usuarios');
// Cria a conexão com o Banco de Dados
Object.freeze(config)
const config2 = new Config('localhost', 3532, 'root', '13455', 'registrados');
async function ConectionToDB(conf) {
  const connection = await mysql.createConnection(conf);
  try {
    console.log('Listo');
    return connection
  } catch(error) {
    console.log(`Error: ${error}`);
    return false
  }
}

const connection = ConectionToDB(config)

module.exports = {
  connection
}