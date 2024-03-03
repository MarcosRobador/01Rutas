'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservaSchema = new Schema({
    id: String,
    nombre: String,
    tipo: String,
    descripcion: String
})

// Creamos el modelo
const Reserva = mongoose.model('Reserva', reservaSchema, "reserva");

module.exports = Reserva;
