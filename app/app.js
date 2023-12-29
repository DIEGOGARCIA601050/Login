const { ValidateSchema } = require('./Schema.js')
const path = require('path');
const cors = require('cors')
const express = require('express')
const { connection } = require('./database.js')
const PORT = process.env.PORT ?? 3000

const app = express()

app.use(express.static('../public'))
app.use(cors({
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
  }))
app.use(express.json())

app.disable('x-powered-by')
  
  // Conéctate a la base de datos

app.get('/',(req, resp)=>{
    resp.sendFile(path.resolve('../public/index.html'));
})

app.get('/red-social', (req, res) => {
    res.sendFile(path.resolve('../../Conversor/alexander-sinn-YYUM2sNvnvU-unsplash.jpg'))
})

app.get('/usuarios/registro', cors(), (req, resp)=>{
    // Consulta simples
connection.query(
    'SELECT * FROM registrados',
    function(err, results, fields) {
      // "results" contêm as linhas retornadas pelo servidor
      resp.json(results)
    }
  );
})

app.post('/', cors(), (req, res) => {
    const data = req.body;
    
    if (ValidateSchema(data)) {
        connection.query(
            `insert into registrados(nombre, apellido, contraseña, edad) values ('${data.nombre}', '${data.apellido}', '${data.contrasena}', ${data.edad})`,
            function(err, results, fields) {
                if (err) {
                    console.log(err);
                    return false
                }
                console.log(results); // "results" contêm as linhas retornadas pelo servidor
            }
        );
        res.status(201).send({
            "mensaje": "recibido"
        })
    } else {
        res.status(400).json({
            "error": "El formato del mensaje no es correcto"
        })
    }
})

app.put('/usuarios',(req, resp)=>{
    resp.send('usuario actualizado exitosamente');
})

app.delete('/usuarios',(req, resp)=>{
    resp.send('usuario borrado exitosamente')
})

app.patch('/usuarios',(req, resp)=>{
    resp.send('cambios realizados en el usuario exitosamente')
})

app.use((req, res) => {
    res.status(404).send('<h1>Error 404: page not found')
})

app.listen(PORT)
console.log(`Server on  http://localhost:${PORT}`)