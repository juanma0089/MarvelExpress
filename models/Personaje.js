'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personajeSchema = new Schema({
    id:String,
    nombre:String,
    super_poder:String,
    descripcion: String
})

const Personaje = mongoose.model('Personaje', personajeSchema, 'personaje');

module.exports = Personaje;