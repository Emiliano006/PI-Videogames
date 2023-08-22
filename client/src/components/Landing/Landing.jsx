import { Link } from 'react-router-dom';
import styles from './Landing.module.css';
import Fondo from './Fondo.jpeg'; 

const Landing = () => {
  

  return (
    <div className={styles.principal}>
      <Link className={styles.buttonContainer} to="/home">START</Link>
      <div className={styles.imageContainer}>
        <img src={Fondo} alt="Imagen de la Landing Page" />
      </div>
    </div>
  );
};

export default Landing;