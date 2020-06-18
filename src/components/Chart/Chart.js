import React, { useEffect, useContext } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import ApiContext from './../../context/api/api.context';

import styles from './Chart.module.css';

const Chart = () => {
  const apiContext = useContext(ApiContext);
  const { fetchDailyData, daily } = apiContext;
  let innerWidth;

  useEffect(() => {
    fetchDailyData();
    innerWidth = window.innerWidth;
  }, [window.innerWidth]);

  const lineChart = daily[0] ? (
    <Line
      data={{
        labels: daily.map(({ date }) => date),
        datasets: [
          {
            data: daily.map(({ confirmed }) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          },
          {
            data: daily.map(({ deaths }) => deaths),
            label: 'Deaths',
            borderColor: '#3333ff',
            backgroundColor: 'red',
            fill: true,
          },
        ],
      }}
      width={100}
      height={innerWidth < 1000 ? 75 : 35}
    />
  ) : null;

  return <div className={styles.container}>{lineChart}</div>;
};

export default Chart;
