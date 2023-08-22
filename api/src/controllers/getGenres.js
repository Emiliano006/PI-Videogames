const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Genre} = require('../db.js');


const getGenres = async (req , res) =>{

    try {
        //Primero se pregunta si hay algo en la base de datos
        const db = await Genre.findAll()
        // Si no llega a ver nada, pido los generos de la API y los guardo en db

        if(db.length){
            return res.status(200).json(db);
        }
        
        const respuesta = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        
        const genresMap = respuesta.data.results.map(gen =>{
            return{
                id: gen.id,
                name: gen.name,
            }
        });
        await Genre.bulkCreate(genresMap);;
        // Aqui se retornar el array con los generos y si ya estaban en db, entonces retornara el resultado de la busqueda solicitada.
        res.status(200).json(genresMap)

    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = getGenres;