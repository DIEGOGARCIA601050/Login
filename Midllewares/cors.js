const cors = require('cors')

const Cors = () =>  cors({
    origin: (origin, callback) => {
      const AceptedOrigins = [
        'http://localhost:3000',
        'dominio.example'
      ]
      if (AceptedOrigins.includes(origin)) {
        return callback(null, true)
      }
      if (!origin) {
        return callback(null, true)
      }
      return callback(new Error('No hay cors'))
    }
  })

module.exports = {
    Cors
}