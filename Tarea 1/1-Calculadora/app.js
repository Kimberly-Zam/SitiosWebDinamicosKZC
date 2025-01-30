const express = require('express');
const app = express();
const port = 3000;
const path=require('path');

app.use(express.urlencoded({ extended: false }));  // Para poder leer los datos de un formulario

app.set('view engine', 'ejs'); // Configurar EJS como motor de plantillas
app.use(express.static('public')); // Servir archivos estáticos

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' });
});

app.get('/:operacion', (req, res) => {
    const operacion = req.params.operacion;
    if (['sumar', 'restar', 'multiplicar', 'dividir'].includes(operacion)) {
        res.render(operacion); // Renderiza la vista correspondiente
    } else {
        res.status(404).send('Operación no válida');
    }
});

app.post('/:operacion', (req, res) => {
    const { operacion } = req.params;
    const num1 = parseFloat(req.body.num1);
    const num2 = parseFloat(req.body.num2);

    let resultado;

    switch (operacion) {
        case 'sumar':
            resultado = num1 + num2;
            break;
        case 'restar':
            resultado = num1 - num2;
            break;
        case 'multiplicar':
            resultado = num1 * num2;
            break;
        case 'dividir':
            if (num2 === 0) {
                return res.render('resultado', { resultado: 'Error: División por cero' });
            }
            resultado = num1 / num2;
            break;
        default:
            return res.status(404).send('Operación no válida');
    }

    res.render('resultado', { resultado });
});

// Iniciar servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});