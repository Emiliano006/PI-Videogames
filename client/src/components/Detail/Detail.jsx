import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import parser from 'html-react-parser';
import style from './Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const [gameDetail, setGameDetail] = useState({});
  const [error, setError] = useState(null);

  
  useEffect(() => {
    const getAxios = async () => {
      try {
        const detail = await axios.get(`http://localhost:3001/videogames/${id}`);
        if (!detail.data || Object.keys(detail.data).length === 0) {
          throw new Error("Juego no encontrado");
        }
        setGameDetail(detail.data);
      } catch (error) {
        setError(error.message);
      }
    };
    getAxios();
  }, [id]);

  if (gameDetail.description) {
    return (
      <div className={style.container}>
      
        <div className={style.contenido}>
          <h1>{gameDetail.name}</h1>
          {gameDetail.db ?
          <img src={gameDetail.image} alt="Loading..." />: <img src={gameDetail.background_image} alt="Loading..."/>
        }{/* pregunta si gameDetail es verdadero, si da true se ejecuta lo que esta despues del ?, y sino se ejecuta lo que esta despues de los :  */}
          <h2>Genres: {gameDetail.genres.map(genre => genre.name).join(', ')}</h2>
          <h2>Rating: {gameDetail.rating}</h2>
          {gameDetail.platforms && Array.isArray(gameDetail.platforms) && gameDetail.platforms.length > 0 && (
            <h2>Platforms: {gameDetail.platforms.map(platform => platform.platform.name).join(' ,  ')}</h2>
          )}
          <h2>Released: {gameDetail.released}</h2>
          <h3>Description: {parser(gameDetail.description)}</h3>
        </div>
      </div> 
    );
  } else if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>Charging...</p>
      </div>
    );
    }
  };
export default Detail;