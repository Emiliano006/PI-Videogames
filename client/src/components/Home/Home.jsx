import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Cards from '../Cards/Cards';
import style from './Home.module.css'


const Home = ({page, setPage}) => {
  const allGames = useSelector((state) => state.allGames);
  const gamesByName = useSelector((state) => state.gamesByname);

  const [games, setGames] = useState([]);


  useEffect(() => {
    if (gamesByName.length) {
      setGames(gamesByName);
    } else if (allGames.length) {
      setGames(allGames);
    }
  }, [allGames, gamesByName]);

  
 

  return (
    <div className= {style.container}>
      <Cards games={games} page={page} setPage={setPage} />
    </div>
  );
};

export default Home;