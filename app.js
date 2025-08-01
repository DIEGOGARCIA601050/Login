const { ValidateSchema, ValidatePartialSchema } = require('./Schemas/Schema.js');
const { Cors } = require('./Midllewares/cors.js');
const pokemons = require('./pokemones.json');

const path = require('node:path');

const express = require('express');
const { connection } = require('./database.js');
const PORT = process.env.PORT ?? 3000;

const app = express();

app.use(express.static('public'));
app.use(Cors());
app.use(express.json());

app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.json(pokemons);
});

app.get('/login', (req, resp) => {
    resp.sendFile(path.resolve('public/index.html'));
});

app.get('/red-social', (req, res) => {
    res.sendFile(path.resolve('../../Conversor/alexander-sinn-YYUM2sNvnvU-unsplash.jpg'));
});

app.get('/usuarios', Cors(), async (req, resp) => {
    try {
        const connect = await connection; // Esperar a que se resuelva la conexión
        const [results] = await connect.query('SELECT * FROM registrados'); // Usar await para la consulta
        resp.json(results); // Enviar los resultados como respuesta
    } catch (error) {
        console.log(error); // Log del error
        resp.status(500).send('Error al consultar la base de datos'); // Enviar respuesta de error al cliente
    }
});

app.get('/usuarios/?password&username', async (req, resp) => {
    const { password, username } = req.query;

    if (!password || !username) {
        return resp.status(422).send('contraseña o usuario incorrectos');
    }

    const connect = await connection;
    try {
        const [result] = await connect.query(`SELECT * FROM registrados WHERE contrasena = ? AND nombre = ?`, [password, username]);
        resp.json(result);
    } catch (error) {
        console.log(error);
        resp.status(500).send('Error al consultar la base de datos');
    }
});


app.post('/', Cors(), async (req, res) => {
    const data = req.body;
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }
    const connect = await connection; // Esperar a que se resuelva la conexión
    try {
        if (ValidateSchema(data)) {
            const result = await connect.query(
                `INSERT INTO registrados(nombre, correo, contrasena, edad) VALUES (?, ?, ?, ?)`,
                Object.values(data)
            ); // Usar await para la consulta
            console.log(result); // "result" contiene las filas afectadas
            res.status(201).send({
                "mensaje": "recibido"
            });
        } else {
            res.status(400).json({
                "error": "El formato del mensaje no es correcto"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ 'error': 'Error al insertar en la base de datos' });
    }
});

app.put('/usuarios', (req, resp) => {
    resp.send('usuario actualizado exitosamente');
});

app.patch('/usuarios/:id', async (req, resp) => {
    const { id } = req.params;
    const { nombre, apellido, contrasena, edad } = req.body;
    const Validador = ValidatePartialSchema(req.body);

    if (!Validador || !id) {
        resp.status(400).json({
            "error": "El formato del mensaje no es correcto"
        });
        return false;
    }

    const connect = await connection; // Esperar a que se resuelva la conexión
    try {
        for (const element in req.body) {
            if (Object.prototype.hasOwnProperty.call(req.body, element)) {
                const result = await connect.query(`UPDATE registrados SET ${element} = ? WHERE id = ?`, [req.body[element], id]);
                console.log(result);
            }
        }
        resp.send('cambios realizados en el usuario exitosamente');
    } catch (error) {
        console.log(error);
        resp.status(500).send('Error al actualizar el usuario');
    }
});

app.delete('/usuarios/:id', async (req, resp) => {
    const { id } = req.params;

    if (!id) {
        return resp.status(422).send('id no encontrado');
    }

    const connect = await connection; // Esperar a que se resuelva la conexión
    try {
        const result = await connect.query(`DELETE FROM registrados WHERE id = ?`, [id]);
        console.log(result);
        resp.send('usuario borrado exitosamente');
    } catch (err) {
        console.log(err);
        resp.status(500).send('error interno al conectar con base de datos');
    }
});

app.use((req, res) => {
    res.status(404).send('<h1>Error 404: page not found</h1>');
});

app.listen(PORT);
console.log(`Server on http://localhost:${PORT}`);
