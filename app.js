const { ValidateSchema, ValidatePartialSchema } = require('./Schemas/Schema.js')
const { Cors } = require('./Midllewares/cors.js')

const path = require('node:path');

const express = require('express')
const { connection } = require('./database.js')
const PORT = process.env.PORT ?? 3000

const app = express()

app.use(express.static('../public'))
app.use(Cors())
app.use(express.json())

app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.json()
})
app.get('/login',(req, resp)=>{
    resp.sendFile(path.resolve('../public/index.html'));
})

app.get('/red-social', (req, res) => {
    res.sendFile(path.resolve('../../Conversor/alexander-sinn-YYUM2sNvnvU-unsplash.jpg'))
})

app.get('/usuarios', Cors(), (req, resp)=>{
    // Consulta simples
connection.query(
    'SELECT * FROM registrados',
    function(err, results, fields) {
        if (err) {
            console.log(err);
            return false
        }
      // "results" contêm as linhas retornadas pelo servidor
      resp.json(results)
    }
  );
})

app.post('/', Cors(), (req, res) => {
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

app.patch('/usuarios/:id', (req, resp) => {
    const { id } = req.params
    const { nombre, apellido, contrasena, edad } = req.body
    const Validador = ValidatePartialSchema(req.body)
    if (!Validador) {
        resp.status(400).json({
            "error": "El formato del mensaje no es correcto"
        })
        return false
    }
    connection.query(`update registrados set nombre = '${nombre}' where id = ${id}`, (err, results, fields) => {
        if (err) {return false} else {console.log(results);}
    })
    resp.send('cambios realizados en el usuario exitosamente mierda')
})

app.delete('/usuarios/:id', (req, resp) => {
    const { id } = req.params
    connection.query(`delete from registrados where id = ${id}`, (err, results, fields) => {
        if (err) {
            console.log(err);
            resp.status(500).send('error interno')
        } else {
            console.log(fields);
            console.log(results);
            resp.send('usuario borrado exitosamente')
        }
    })   
})

app.use((req, res) => {
    res.status(404).send('<h1>Error 404: page not found')
})

app.listen(PORT)
console.log(`Server on  http://localhost:${PORT}`)