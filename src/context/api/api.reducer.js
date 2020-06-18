import {
  GET_DATA,
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
  GET_DAILY_DATA,
  FETCH_COUNTRIES,
  SET_COUNTRY,
  FETCH_COUNTRY,
  COUNTRY_DATA,
  CLEAR_COUNTRY,
} from './api.types';

export default function ApiReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING_TRUE:
      return { ...state, loading: true };
    case SET_LOADING_FALSE:
      return { ...state, loading: false };
    case GET_DATA:
    case FETCH_COUNTRY:
      return { ...state, data: payload };
    case GET_DAILY_DATA:
      return { ...state, daily: payload };
    case FETCH_COUNTRIES:
      return { ...state, countries: payload };
    case SET_COUNTRY:
      return { ...state, country: payload };
    case COUNTRY_DATA:
      return { ...state, barChartData: payload };
    case CLEAR_COUNTRY:
      return { ...state, country: null };
    default:
      return state;
  }
}
