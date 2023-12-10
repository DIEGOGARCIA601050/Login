// const { Cantidad } = require('../public/login.js')
const path = require('path');
const express = require('express')

const app = express()

app.use(express.static('../public'))

app.disable('x-powered-by')

app.get('/',(req, resp)=>{
    resp.sendFile(path.resolve('../public/index.html'));
    // resp.sendFile(path.resolve('../login.js'));
    // resp.sendFile(path.resolve('../styles.css'));
})

app.get('/red-social', (req, res) => {
    res.send('<img alt="red-social" src="https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>')
})

app.post('/usuarios',(req, resp)=>{
    resp.status(201).send('<h1>!Bienvenido¡ nuevo usuario</h1>');
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
console.log(`Server on  https://localhost:${3000}`)