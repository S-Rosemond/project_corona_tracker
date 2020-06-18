import React from 'react';
import { Cards, Chart, CountryPicker } from '../components';
import styles from './App.module.css';
import coronaImage from '../images/image.png';

const App = () => {
  return (
    <div className={styles.container}>
      <img className={styles.image} src={coronaImage} alt='Covid-19' />
      <Cards />
      <CountryPicker />
      <Chart />
    </div>
  );
};

export default App;
