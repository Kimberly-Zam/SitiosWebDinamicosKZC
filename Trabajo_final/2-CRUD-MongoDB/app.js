const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cliente = require('./models/cliente'); // Modelo importado

const app = express();

// Configuración
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // Para soportar PUT y DELETE
app.set('view engine', 'ejs');

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/clientes');

// Rutas
app.get('/', async (req, res) => {
    const consulta = req.query.nombre;
    if (consulta) {
        const clientes = await cliente.find({ nombre: consulta });
        return res.render('index', { clientes });
    }
    const clientes = await cliente.find();
    res.render('index', { clientes });
});

app.get('/cliente/nuevo', (req, res) => {
    res.render('crear');
});

app.post('/clientes', async (req, res) => {
    const { ci, nombres, apellidos, celular, correo } = req.body;
    await cliente.create({ ci, nombres, apellidos, celular, correo });
    res.redirect('/');
});

app.get('/clientes/:id', async (req, res) => {
    const clienteEncontrado = await cliente.findById(req.params.id); // Cambia el nombre de la variable
    res.render('mostrar', { cliente: clienteEncontrado });
});

app.get('/clientes/:id/editar', async (req, res) => {
    const clienteEncontrado = await cliente.findById(req.params.id); // Cambia el nombre de la variable
    res.render('editar', { cliente: clienteEncontrado });
});

app.put('/clientes/:id', async (req, res) => {
    const { ci, nombres, apellidos, celular, correo } = req.body;
    await cliente.findByIdAndUpdate(req.params.id, { ci, nombres, apellidos, celular, correo });
    res.redirect('/');
});

app.delete('/clientes/:id', async (req, res) => {
    await cliente.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});