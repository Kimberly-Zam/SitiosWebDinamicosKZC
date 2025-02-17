const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/admin', (req, res) => {
    db.query('SELECT id, nombre, precio, imagen, detalle FROM productos', (error, productos) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('productos/admin', { productos });
    });
});

// Mostrar formulario para crear un producto
router.get('/crear', (req, res) => {
    res.render('productos/crear');
});

router.post('/crear', (req, res) => {
    const { nombre, precio, imagen, detalle } = req.body;
    db.query(
        'INSERT INTO productos (nombre, precio, imagen, detalle) VALUES (?, ?, ?, ?)',
        [nombre, precio, imagen, detalle],
        (err, results) => {
            if (err) throw err;
            res.redirect('/');
        }
    );
});

router.get('/editar/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT id, nombre, precio, imagen, detalle FROM productos WHERE id = ?', [id], (error, productos) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('productos/editar', { producto: productos[0] });
    });
});

router.post('/editar/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, precio, imagen, detalle } = req.body;
    db.query('UPDATE productos SET nombre = ?, precio =?, imagen = ?, detalle = ? WHERE id = ?', [nombre, precio, imagen, detalle,id], (error, resultado) => {
        if (error) {
            console.log(error);
            return;
        }
        res.redirect('/');
    });
});

router.get('/borrar/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM productos WHERE id = ?', [id], (error, resultado) => {
        if (error) {
            console.log('Error al eliminar el producto');
            return;
        }
        res.redirect('/');
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT id,nombre,precio,imagen,detalle FROM productos WHERE id = ?', [id], (error, producto) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('productos/index', { producto: producto[0] });
    });
});

module.exports = router;