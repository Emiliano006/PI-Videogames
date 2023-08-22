import { Link } from 'react-router-dom';
import { getAllGames, getGamesByName, getGenres } from '../../redux/actions';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import style from './NavBar.module.css'

const NavBar = ({setPage}) => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getAllGames());
    dispatch(getGenres());
  }, [dispatch]);

  const onSearch = (name) => {
    dispatch(getGamesByName(name));
    
    setPage(0);
  };

  const handleHomeButtonClick = () =>{
    window.location.reload()
  }


  return (
    <div className={style.nav}>
      <h1> Game World</h1>
      <div className={style.botones}>
        <button onClick={handleHomeButtonClick} className={style.Link}>
          <Link to='/home'>Home</Link>
        </button>
      </div>
      <div>
        <button className={style.Link}>
          <Link to='/createForm'>Create a Videogame</Link>
        </button>
      </div>
      <div>
        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};

export default NavBar;