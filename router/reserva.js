"use strict"

const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

router.get('/', async (req, res) => {
  try {
    // podemos arrayReservaDB para diferenciar
    // los datos que vienen de la base de datos
    // con respecto al arrayReserva que tenemos EN LA VISTA

    const arrayReservaDB = await Reserva.find();
    console.log(arrayReservaDB);
    res.render("reserva", {
      arrayReserva: arrayReservaDB
    })
  } catch (error) {
    console.error(error);
  }
})

router.post('/', async (req, res) => {
  const body = req.body //Gracias al body parser, de esta forma podemos recuperar todo lo que viene del body
  console.log(body) //Para comprobarlo por pantalla

  try {
    const reservaDB = new Reserva(body)
    //Creamos un nuevo Reserva, gracias al modelo
    await reservaDB.save() //Lo guardamos con .save(), gracias a Mongoose
    res.redirect('/reserva') //Volvemos al listado
  } catch (error) {
    console.log('error', error)
  }
})

router.get('/crear', (req, res) => {
  res.render('crear')
})

router.get('/:id', async (req, res) => {
  const id = req.params.id // Recordemos que en la plantilla "reserva.ejs" le pusimos /:este campo reserva.id, por eso lo llamamos con params.id
  try {
    const reservaDB = await Reserva.findById(id) // Aquí usamos findById para buscar en la base de datos de Mongo
    console.log(reservaDB) // Para probarlo por consola
    res.render('detalle', { // Para mostrar el objeto en la vista "detalle", que tenemos que crear
      reserva: reservaDB,
      error: false
    })
  } catch (error) { // Si el id indicado no se encuentra
    console.log('Se ha producido un error', error)
    res.render('detalle', { // Mostraremos el error en la vista "detalle"
      error: true,
      mensaje: 'Reserva no encontrada!'
    })
  }
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log('_id desde backend', id);
  try {
    // En la documentación de Mongoose podremos encontrar la
    // siguiente función para eliminar
    const reservaDB = await Reserva.findByIdAndDelete({ _id: id });
    console.log(reservaDB);
    // https://stackoverflow.com/questions/27202075/expressjs-res-redirect-not-working-as-expected
    // res.redirect('/reserva') // Esto daría un error, tal y como podemos ver arriba
    if (!reservaDB) {
      res.json({
        estado: false,
        mensaje: 'No se puede eliminar la Reserva.'
      });
    } else {
      res.json({
        estado: true,
        mensaje: 'Reserva eliminada.'
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log('id', id);
  console.log('body', body);

  try {
    const reservaDB = await Reserva.findByIdAndUpdate(
      id,
      body,
      { useFindAndModify: false }
    );
    console.log(reservaDB);
    res.json({
      estado: true,
      mensaje: 'Reserva editada'
    });
  } catch (error) {
    console.log(error);
    res.json({
      estado: false,
      mensaje: 'Problema al editar la Reserva'
    });
  }
});

module.exports = router;
