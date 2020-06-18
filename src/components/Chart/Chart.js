import React, { useEffect, useContext, useRef } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import ApiContext from './../../context/api/api.context';

import styles from './Chart.module.css';

const Chart = () => {
  const apiContext = useContext(ApiContext);
  const { fetchDailyData, daily, country, barChartData } = apiContext;

  useEffect(() => {
    fetchDailyData();
  }, []);

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
    />
  ) : null;

  let BarChart;
  if (barChartData !== null) {
    BarChart = (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: [
                'rgb(255, 60, 0)',
                'rgba(0, 218, 54, 0.822)',
                ' rgba(0, 0, 0, 0.404)',
              ],
              data: [
                barChartData.confirmed,
                barChartData.recovered,
                barChartData.deaths,
              ],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      ></Bar>
    );
  }

  return (
    <div className={styles.container}>{country ? BarChart : lineChart}</div>
  );
};

export default Chart;
