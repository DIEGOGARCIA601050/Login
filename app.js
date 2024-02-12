const { ValidateSchema, ValidatePartialSchema } = require('./Schemas/Schema.js')
const { Cors } = require('./Midllewares/cors.js')
const pokemons = require('./pokemones.json')

const path = require('node:path');

const express = require('express')
const { connection } = require('./database.js')
const PORT = process.env.PORT ?? 3000

const app = express()

app.use(express.static('public'))
app.use(Cors())
app.use(express.json())

app.disable('x-powered-by')

app.get('/', (req, res) => {
    res.json(pokemons)
})
app.get('/login',(req, resp)=>{
    resp.sendFile(path.resolve('public/index.html'));
})

app.get('/red-social', (req, res) => {
    res.sendFile(path.resolve('../../Conversor/alexander-sinn-YYUM2sNvnvU-unsplash.jpg'))
})

app.get('/usuarios', Cors(), (req, resp)=>{
    // Consulta simples
    console.log(connection);
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
            `insert into registrados(nombre, apellido, contraseña, edad) values (?, ?, ?, ?)`,
            Object.values(data),
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
    if (!Validador || !id) {
        resp.status(400).json({
            "error": "El formato del mensaje no es correcto"
        })
        return false
    }
    connection.query(`update registrados set nombre = ? where id = ?`, [nombre, id], (err, results, fields) => {
        if (err) {return false} else {console.log(results);}
    })
    resp.send('cambios realizados en el usuario exitosamente mierda')
})

app.delete('/usuarios/:id', (req, resp) => {
    const { id } = req.params
    if(!id) resp.status(422).send('id no encontrado')
    connection.query(`delete from registrados where id = ?`, [id], (err, results, fields) => {
        if (err) {
            console.log(err);
            resp.status(500).send('error interno al conectar con base de datos')
        } else {
            console.log(fields);
            console.log(results);
            resp.send('usuario borrado exitosamente')
        }
    })   
})

app.use((req, res) => {
    res.status(404).send('<h1>Error 404: page not found</h1>')
})

app.listen(PORT)
console.log(`Server on  http://localhost:${PORT}`)