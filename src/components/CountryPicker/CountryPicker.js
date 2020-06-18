import React, { useEffect, useContext } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';
import ApiContext from './../../context/api/api.context';

const CountryPicker = () => {
  const apiContext = useContext(ApiContext);
  const { fetchCountries, countries, setCountry } = apiContext;

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <FormControl className={styles.FormControl}>
      <NativeSelect onChange={(e) => setCountry(e.target.value)}>
        <option value='global'>Global</option>
        {countries.map((country, idx) => (
          <option key={idx} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default CountryPicker;
