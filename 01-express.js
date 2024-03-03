'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middlewares
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(__dirname + '/public'));

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Rutas
app.use('/', require('./router/rutas'));
app.use('/reserva', require('./router/reserva'));

// Conexión a MongoDB
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@marcos.salg3uw.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log('Error de conexión a la base de datos:', e));

// Manejo de página no encontrada (404)
app.use((req, res) => {
  res.status(404).render('404', {
    titulo: "Error 404",
    descripcion: "Página No Encontrada"
  });
});

// Iniciar el servidor
app.listen(port, () => console.log(`Iniciando Express en el puerto ${port}`));
