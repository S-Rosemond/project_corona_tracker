import React, { useReducer } from 'react';
import ApiContext from './api.context';
import ApiReducer from './api.reducer';
import axios from 'axios';
import {
  GET_DATA,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  GET_DAILY_DATA,
  FETCH_COUNTRIES,
  SET_COUNTRY,
  FETCH_COUNTRY,
} from './api.types';
import initialState from './api.initialState';

const ApiState = (props) => {
  const [state, dispatch] = useReducer(ApiReducer, initialState);

  const apiCall = (url = 'https://api.covid19api.com') =>
    axios.create({
      baseURL: url,
      timeout: 8000,
    });

  const tutorialFetchData = async () => {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await apiCall('https://covid19.mathdro.id/api').get();
    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    dispatch({ type: SET_LOADING_TRUE });
    dispatch({ type: GET_DATA, payload: modifiedData });
    dispatch({ type: SET_LOADING_FALSE });
  };

  const fetchDailyData = async () => {
    const { data } = await apiCall(
      'https://covid19.mathdro.id/api/daily'
    ).get();

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    dispatch({ type: SET_LOADING_TRUE });
    dispatch({ type: GET_DAILY_DATA, payload: modifiedData });
    dispatch({ type: SET_LOADING_FALSE });
  };

  const fetchCountries = async () => {
    try {
      const {
        data: { countries },
      } = await apiCall('https://covid19.mathdro.id/api/countries').get();

      const countryNames = countries.map((country) => country.name);

      dispatch({ type: FETCH_COUNTRIES, payload: countryNames });
    } catch (error) {
      throw error;
    }
  };

  const fetchCountry = async (name) => {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await apiCall(`https://covid19.mathdro.id/api/countries/${name}`).get();

    const modifiedData = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };
    dispatch({ type: SET_LOADING_TRUE });
    dispatch({ type: FETCH_COUNTRY, payload: modifiedData });
    dispatch({ type: SET_LOADING_FALSE });
  };

  const setCountry = async (country) => {
    await fetchCountry(country);
    dispatch({ type: SET_COUNTRY, payload: country });
  };

  return (
    <ApiContext.Provider
      value={{
        state,
        data: state.data,
        daily: state.daily,
        countries: state.countries,
        country: state.country,
        loading: state.loading,
        tutorialFetchData,
        fetchDailyData,
        fetchCountries,
        setCountry,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
};

export default ApiState;
