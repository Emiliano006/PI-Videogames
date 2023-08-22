import axios from "axios";

export const GET_ALLGAMES = 'GET_ALLGAMES';
export const GET_GENRES = 'GET_GENRES';
export const GET_GAMESBYNAME = 'GET_GAMESBYNAME';
export const GET_BYALL = 'GET_BYALL';

export const url = 'http://localhost:3001';

export const getAllGames = () => {
  return async (dispatch) => {
    const respuesta = await axios(`${url}/videogames`);

    return dispatch({
      type: GET_ALLGAMES,
      payload: respuesta.data,
    });
  };
};

export const getGamesByName = (name) => {
  return async (dispatch) => {
    const respuesta = await axios(`${url}/videogames?name=${name}`);

    return dispatch({
      type: GET_GAMESBYNAME,
      payload: respuesta.data,
    });
  };
};

export const getGenres = () => {
  return async (dispatch) => {
    const respuesta = await axios(`${url}/genres`);

    return dispatch({
      type: GET_GENRES,
      payload: respuesta.data,
    });
  };
};

export const byAll = () =>{
  return  {
      type: GET_BYALL,
      payload: {}
    }
  }    