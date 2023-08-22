const axios = require('axios');
require('dotenv').config();
const {API_KEY} = process.env;
const {Videogame , Genre} = require('../db');

const getVideogames = async (req, res) => {
    try {
        const promises = [];
        for (let i = 1; i < 6; i++){
            let apiGet = axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);
            promises.push(apiGet);
        };
        
        const videoGames = (await Promise.all(promises)).map(prom => prom.data.results.map(videogame => {
            return{
                id: videogame.id,
                name: videogame.name,
                image: videogame.background_image,
                rating: videogame.rating,
                platforms: videogame.platforms,
                genres: videogame.genres.map(genres =>{
                    return{
                        name: genres.name,
                    }
                }),

            }
        })).flat()
        
        const dbVideogames = await Videogame.findAll({
            attributes:['id', 'name' , 'image' , 'rating', 'platforms'],
            include: [{
                model: Genre,
                attributes: ['name'],
                throught: {
                    attributes: []
                }
            }]
        })
        const respuesta = [...dbVideogames, ...videoGames]
        
        res.status(200).json(respuesta)

    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = getVideogames;
