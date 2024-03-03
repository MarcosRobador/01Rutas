'use strict';

let express = require('express'),
    app = express();

app
    .get('/', (req, res) => {
        res.send("<h1>Hola Mundo desde Express con Nodemon</h1>");
    })
    .get('/contact', (req, res) => {
        res.send("Contacto");
    })
    .listen(3000);

console.log('Iniciando Express en el puerto 3000');
