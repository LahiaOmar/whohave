import React from 'react';
import { makeStyles, Typography, Grid, Button } from '@material-ui/core';

import './style.css';

import Carousel from '../Carousel'

const useStyles = makeStyles((theme) => ({
  card: {
    border: `2px solid ${theme.palette.primary['light']}`,
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    width: '360px'
  }
}))

const ListOfProduct = ({ products, feedback }) => {
  const classes = useStyles()

  return (
    <>
      {
        products.map(product => {
          return (
            <Grid container item justify="center" xs={12} sm={10} md={8}>
              <div style={{ margin: '15px' }}>
                <Grid container className={classes.card}
                  justify="center" alignItems="center">
                  <Grid item xs={12}>
                    <Carousel images={product.images} />
                  </Grid>
                  <div style={{ padding: '16px' }}>
                    <Grid container item xs={12} spacing={2}>
                      <Grid item xs={12}>
                        <Grid container>
                          <Grid item xs={12}>
                            <Typography>{product.name}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="body2" color="textSecondary" component="p">
                              {product.description}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container direction="row" alignItems="center" justify="center">
                          <Grid container item xs={6} justify="center">
                            <Grid item>
                              <Button color="primary" variant="contained" size="large">Yup</Button>
                            </Grid>
                          </Grid>
                          <Grid container item xs={6} justify="center">
                            <Grid item>
                              <Button color="secondary" variant="contained" size="large">Nope</Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </div>
            </Grid>
          )
        })
      }
    </>
  )
}




export default ListOfProduct