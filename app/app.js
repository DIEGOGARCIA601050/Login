const { ValidateSchema } = require('./Schema.js')
const path = require('path');
const cors = require('cors')
const express = require('express')
const { connection } = require('./database.js')
// const { response } = require('express');
// const { json } = require('express/lib/response');

const app = express()

app.use(express.static('../public'))
app.use(cors())
app.use(express.json())

app.disable('x-powered-by')
  
  // Conéctate a la base de datos
//   connection.connect((err) => {
//     if (err) {
//       return console.error('Error conectando a la base de datos:', err);
//     }
//     console.log('Conectado a la base de datos MySQL.');
  
//         // Realiza una consulta SQL
//         connection.query('SELECT * FROM registrados', (err, rows) => {
//         if (err) {
//             return console.error('Error ejecutando la consulta:', err);
//         }
    
//         // Imprime los resultados de la consulta
//         console.log(rows);
    
//         // Cierra la conexión a la base de datos
//         connection.end((err) => {
//             if (err) {
//             return console.error('Error cerrando la conexión a la base de datos:', err);
//             }
//             console.log('Conexión a la base de datos cerrada.');
//     })
//     })
// });

app.get('/',(req, resp)=>{
    resp.sendFile(path.resolve('../public/index.html'));
})

app.get('/red-social', (req, res) => {
    res.sendFile(path.resolve('../../Conversor/alexander-sinn-YYUM2sNvnvU-unsplash.jpg'))
})

app.get('/usuarios/registro', cors(), (req, resp)=>{
    resp.json({
        nombre: 'John',
        edad: 25,
        correo: 'john.adams@example-pet-store.com'
    }
    )
})

app.post('/', cors(), (req, res) => {
    const data = req.body;
    
    if (ValidateSchema(data)) {
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

app.listen(3000)
console.log(`Server on  http://localhost:${3000}`)