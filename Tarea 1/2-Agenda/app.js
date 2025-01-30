const express = require('express');
//const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));  // Para poder leer los datos de un formulario
app.use(express.json());

app.set('view engine', 'ejs'); // Configurar EJS como motor de plantillas
app.use(express.static('public')); // Servir archivos estáticos

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.get('/agenda', (req, res) => {
    db.query('SELECT id,nombre,apellido,direccion,telefono FROM agenda', (error, agenda) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('citas', {agenda});
    });
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/add', (req, res) => {
    const { nombre,apellido,direccion,telefono } = req.body;
    db.query('INSERT INTO agenda (nombre,apellido,direccion,telefono) VALUES (?, ?, ?, ?)', [nombre,apellido,direccion,telefono], (error, resultado) => {
        if (error) {
            console.log('Error al insertar el producto');
            return;
        }
        res.redirect('/agenda');
    });
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT id,nombre,apellido,direccion,telefono FROM agenda WHERE id = ?', [id], (error, resultado) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('edit', {agenda: resultado[0]});
    });
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const {nombre,apellido,direccion,telefono} = req.body;
    db.query('UPDATE agenda SET nombre = ?, apellido = ?, direccion = ?, telefono = ? WHERE id = ?', [nombre,apellido,direccion,telefono, id], (error, resultado) => {
        if (error) {
            console.log('Error al actualizar el producto');
            return;
        }
        res.redirect('/agenda');
    });
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM agenda WHERE id = ?', [id], (error, resultado) => {
        if (error) {
            console.log('Error al eliminar el producto');
            return;
        }
        res.redirect('/agenda');
    });
});


// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
