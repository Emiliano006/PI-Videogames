const { Videogame } = require('../db');

const postVideogame = async (req, res) => {
  try {
    const postGame = await Videogame.create(req.body);
    console.log(req.body);
    await postGame.setGenres(req.body.genres);
    const dbGames = await Videogame.findAll({
      where: { name: req.body.name },
    });
    res.status(201).json(dbGames);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postVideogame;