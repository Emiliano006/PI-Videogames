import {Link} from 'react-router-dom';
import React from 'react';
import style from './Card.module.css'

const Card = ({game}) =>{
    return(
        <Link to={`/detail/${game.id}`}>
        <div className={style.container2}>
           <h1>{game.name} </h1>
           <h2>Genres: {game.genres}</h2>
           <h3>Rating: {game.rating}</h3>
          <div className={style.imagen}>
            <img src={game.image}  alt="Charging..." />
          </div>
        </div>        
        </Link>
    )
};

export default Card;