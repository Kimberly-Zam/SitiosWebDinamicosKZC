const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    db.query('SELECT id,nombre,precio,imagen,detalle FROM productos', (error, productos) => {
        if (error) {
            console.log('Error al ejecutar la consulta');
            return;
        }
        res.render('index', { productos });
    });
});

app.get('/carrito', (req, res) => {
    res.render('carrito');
});

// Para ver el producto
const productosRouter = require('./routes/productos');
app.use('/productos', productosRouter);


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});