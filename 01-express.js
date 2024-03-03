'use strict';

let express = require('express'),
  mongoose = require('mongoose'),

  bodyParser = require('body-parser'),
  app = express();

// Parse ----
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// .env ----
require('dotenv').config();
let port = process.env.PORT || 4000;

// Static files ----
app.use(express.static(__dirname + '/public'));

// Views ----
app.set('view engine', 'ejs'),
  app.set('views', __dirname + '/views');

// Routes ----
app.use('/', require('./router/rutas'));
app.use('/reserva', require('./router/reserva'));

const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@marcos.salg3uw.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

console.log(uri)
mongoose.connect(uri)
  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))


app.use((req, res) => {
  res.status(404).render('404', {
    titulo: "Error 404",
    descripcion: "Page Not Found"
  });
});

app.listen(port)
console.log('Iniciando Express en el puerto 3000');
