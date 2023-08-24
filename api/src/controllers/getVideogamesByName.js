const {Videogame , Genre} = require('../db.js');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const {Op} = require('sequelize');


const getVideogameByName = async (req, res , next) =>{
    const {name} = req.query
    console.log(name);
    if(!name) return next();

    try {
        // Consulta la bd para obtener videojuegos con un nombre similar
        const gameByNameDb = await Videogame.findAll({
             where:{
                 name:{
                   [Op.iLike]: `%${name}$`
                 }
             },
             attributes: ['id' , 'name' ,'platforms','image' ],
            include: [{
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }]
        })
        // Consulta la API para obtener videojuegos con el nombre proporcionado
        const gameByNameApi = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`);
        const response = [...gameByNameDb, ...gameByNameApi.data.results.map(game =>{
            return{
                id: game.id,
                name: game.name,
                image: game.background_image,
                genres: game.genres.map(gen =>{
                    return{
                        name: gen.name,
                    }
                })
            }
        })].slice(0, 15)// Limita la respuesta a 15 elementos
        res.status(200).json(response)
    } catch (error) {
        res.status(404).send(error.message)
    }
}

module.exports = getVideogameByName;