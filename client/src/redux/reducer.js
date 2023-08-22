import { GET_ALLGAMES, GET_GAMESBYNAME, GET_GENRES, GET_BYALL } from "./actions";

const initialState = {
  allGames: [],
  gamesByname: [],
  genres: [],
  copyAllGames: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLGAMES:
      return {
        ...state,
        allGames: action.payload,
        copyAllGames: action.payload,
      };
    case GET_GAMESBYNAME:
      return {
        ...state,
        gamesByname: action.payload,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_BYALL:
      return {
        ...state,
        allGames: action.payload,
        copyAllGames: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;