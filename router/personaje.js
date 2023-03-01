'use strict'

const express = require('express');
const router = express.Router();
const Personaje = require('../models/Personaje');

router.get('/', async (req,res) => {

    try {
        const arrayPersonajeDB = await Personaje.find();
        console.log(arrayPersonajeDB);
        res.render('personaje', {
            arrayPersonaje: arrayPersonajeDB
        })
    } catch (error) {
        console.error(error)
    }
    
})


router.get('/crear',(req,res) => {
    res.render('crear')
    })

router.post('/', async (req,res) => {
    const body = req.body //gracias al body parser, de esta forma
    //podemos recuperar todo lo que viene del body
    console.error(body)//comprobamos en pantalla
    try {
        const personajeDB = new Personaje(body);
        //creamos un nuevo Personaje, gracias al modelo
        await personajeDB.save()
        res.redirect('/')

    } catch (error) {
        console.error(error)
    }
    
})

router.get('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const personajeDB = await Personaje.findOne({_id: id});
        console.log(personajeDB);
        res.render('detalle', {
            personaje:personajeDB,
            error: false
        })
    } catch (error) {
        console.error('Se ha producido un error',error)
        res.render('detalle',{
            error: true,
            mensaje: 'Personaje no encontrado!'
        })
    }
    
})

router.delete('/:id', async (req,res) => {
    const id = req.params.id
    try {
        const personajeDB = await Personaje.findByIdAndDelete({_id: id});
        console.log(personajeDB);
       if(!personajeDB){
        res.json({
            estado: false,
            mensaje: 'No se puede eliminar el Personaje'
        })
    }else {
        res.json({
            estado: true,
            mensaje: 'Personaje eliminado'
        })
    }
        
    } catch (error) {
        console.error(error)
    }
    
})

router.put('/:id', async (req,res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const personajeDB = await Personaje.findByIdAndUpdate(
            id, body, {userFindAndModify: false}
            )
        console.log(personajeDB)
        res.json({
            estado: true,
            mensaje: 'Personaje editado'
        })  
    } catch (error) {
        console.error(error)
        res.json({
            estado: false,
            mensaje: 'Problema al editar el Personaje'
        }) 
    }
    
})

module.exports = router;
