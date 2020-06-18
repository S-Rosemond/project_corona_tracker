import React, { useContext, useEffect } from 'react';
import ApiContext from '../../context/api/api.context';
import MuiCard from './MuiCard';

const Cards = () => {
  const apiContext = useContext(ApiContext);
  const { tutorialFetchData, data, loading } = apiContext;

  const { confirmed, recovered, deaths, lastUpdate } = data;

  useEffect(() => {
    tutorialFetchData();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        'Fetching Data...'
      ) : (
        <MuiCard
          array={[
            {
              title: 'Infected',
              data: confirmed && confirmed.value,
              dateTime: lastUpdate,
              text: 'Number of active COVID-19 cases',
            },

            {
              title: 'Recovered',
              data: recovered && recovered.value,
              dateTime: lastUpdate,
              text: 'Number of recoveries from COVID-19',
            },

            {
              title: 'Deaths',
              data: deaths && deaths.value,
              dateTime: lastUpdate,
              text: 'Number of deaths caused by COVID-19',
            },
          ]}
        />
      )}
    </React.Fragment>
  );
};

export default Cards;
