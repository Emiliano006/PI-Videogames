const { Router } = require('express')
const getVideogames = require('../controllers/getVideogames.js')
const postVideogame = require('../controllers/postVideogame.js')
const getVideogamesById = require('../controllers/getVideogamesById.js')
const getVideogamesByName = require('../controllers/getVideogamesByName.js')


const router = Router()

router.get('/',getVideogamesByName, getVideogames)

router.post('/',postVideogame)

router.get('/:id',getVideogamesById)

module.exports = router;