import { useState } from "react";
import style from './SearchBar.module.css';



const SearchBar = ({ onSearch }) => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    if (!/\d/.test(value)){
        setName(value);
        onSearch(value);
    }
  };

  return (
    <div className={style.container}>
      <input type="search" value={name} onChange={handleChange} placeholder="Enter a game" />
      <button onClick={() => onSearch(name)}>Search</button>
      
    </div>
  );
}

export default SearchBar;