import React from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './Cards.module.css';
import cx from 'classnames';

function MuiCard({ array }) {
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify='center'>
        {array.map((el, idx) => (
          <Grid
            item
            component={Card}
            key={idx}
            className={cx(styles.card, styles[el.title.toLocaleLowerCase()])}
            xs={12}
            md={3}
          >
            <CardContent>
              <Typography color='textSecondary' gutterBottom>
                {el.title}
              </Typography>
              <Typography variant='h5'>
                <CountUp
                  start={0}
                  end={el.data ? el.data : 10000}
                  duration={2.5}
                  separator=','
                />
              </Typography>
              <Typography color='textSecondary'>
                {new Date(el.dateTime).toDateString()}
              </Typography>
              <Typography variant='body2'>{el.text}</Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default MuiCard;
