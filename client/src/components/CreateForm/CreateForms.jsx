import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { url } from "../../redux/actions";
import { getAllGames } from "../../redux/actions";
import validations from "./Validation.js";
import style from './Forms.module.css';
import Fondo from './Fondo.jpeg';

const CreateForm = () => {
  // Estado para almacenar los datos del formulario
  const [gameData, setGameData] = useState({
    name: "",
    description: "",
    released: "",
    image: "",
    rating: "",
    platforms: [],
    genres: [],
  });

  const [errors, setErrors] = useState({});  // almacena los errores de validación
  const [isValid, setIsValid] = useState(false); // controla si el formulario es válido

  const dispatch = useDispatch();

  let allGenres = useSelector((state) => state.genres); // Obtener el estado de los géneros desde Redux

  // Validación de los campos al cambiar los datos del juego
  useEffect(() => {
    const validationErrors = validations(gameData);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }, [gameData]);

  // Manejador para cambiar los valores de los campos del formulario
  const handleInputChange = (event) => {
    setGameData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  // Manejador para agregar o quitar un género
  const handleAddGenre = (event) => {
    event.preventDefault();
    const genreId = event.target.name;
    const updatedGenres = gameData.genres.includes(genreId)
      ? gameData.genres.filter((genre) => genre !== genreId)
      : [...gameData.genres, genreId];

    setGameData((prevData) => ({
      ...prevData,
      genres: updatedGenres,
    }));

    setErrors(validations({
      ...gameData,
      genres: updatedGenres,
    }));
  };

  // Manejador para enviar el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Crea un objeto game con los datos del formulario
    const game = {
      ...gameData,
      rating: parseInt(gameData.rating),
      genres: gameData.genres.map((genre) => parseInt(genre)),
      
    };
    
    // Elimina la propiedad image si está vacía
    if (!game.image) {
      delete game.image;
    }
    console.log(game);
    
    // Realiza la petición POST a la API
    try {
      const response = await axios.post(`${url}/videogames`, game);
      alert('The Video Game has been successfully created!!');
      dispatch(getAllGames());
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || error.message;
        alert(errorMessage); 
      } else {
        alert('An error occurred in the request');
      }
    }
  };

  // Renderiza el componente
  return (
    <div className={style.master}>
      <section className={style.seccion}>
        {/* <div className={style.imageContainer}> */}
        {/* <img src={Fondo} alt="Imagen de fondo" /> */}
          <div className={style.inputs}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              name="name"
              value={gameData.name}
              onChange={handleInputChange}
            />
            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
          </div>
        
          <div className={style.inputs}>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              name="description"
              value={gameData.description}
              onChange={handleInputChange}
              placeholder="Game Description"
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description}</p>
            )}
          </div>

          <div className={style.inputs} >
            <label htmlFor="image">Image: </label>
            <input
              type="text"
              name="image"
              value={gameData.image}
              onChange={handleInputChange}
              placeholder="Here goes a url"
            />
            {errors.image && (
              <p style={{ color: "red" }}>{errors.image}</p>
            )}
          </div>

          <div className={style.inputs}>
            <label htmlFor="rating">Rating: </label>
            <input
              type="text"
              name="rating"
              value={gameData.rating}
              onChange={handleInputChange}
              placeholder="Add Classification"
            />
            {errors.rating && <p style={{ color: "red" }}>{errors.rating}</p>}
          </div>

          <div className={style.inputs}>
            <label htmlFor="platforms">Platforms: </label>
            <input
              type="text"
              name="platforms"
              value={gameData.platforms}
              onChange={handleInputChange}
              placeholder="Add the platform"
            />
            {errors.platforms && (
              <p style={{ color: "red" }}>{errors.platforms}</p>
            )}
          </div>

          <div className={style.inputs}>
            <label htmlFor="released">Release: </label>
            <input
              type="date"
              name="released"
              value={gameData.released}
              onChange={handleInputChange}
            />
            {errors.released && <p style={{ color: "red" }}>{errors.released}</p>}
          </div>

          <div className={style.genres}>
            <div>
              {allGenres.map((genre) => (
                <button
                  name={genre.id}
                  onClick={handleAddGenre}
                  key={genre.id}
                  style={{
                    backgroundColor: gameData.genres.includes(genre.id.toString())
                      ? "blue"
                      : "white",
                  }}
                >
                  {genre.name}
                </button>
              ))}
            </div>

            {errors.genres && <p style={{ color: "red" }}>{errors.genres}</p>}
          </div>

          <button
            className={style.boton}
            type="submit"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            Submit
          </button>
        
      </section>
    </div>
  );
};

export default CreateForm;