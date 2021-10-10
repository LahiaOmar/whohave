import React from 'react';
import { Divider, IconButton, TablePagination, Typography, Grid, CardContent, CardActions, Checkbox, Button } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { v4 as uui } from 'uuid';
import ImageIcon from '@material-ui/icons/Image';
import Card from '@material-ui/core/Card'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import './style.css';

import MyModal from '../Mymodal/MyModal';
import Carousel from '../Carousel'
import IllustrationDisplay from '../IllustrationDisplay'
import { ILLUSTRATION_TYPES } from '../../constants/constants'

const ListOfProduct = ({ products, feedback }) => {

  return (
    <>
      {
        products.map(product => {
          return (
            <Grid container item xs={12} justify="center">
              <Grid item xs={6} component={Card} >
                <CardContent>
                  <Grid item container justify="center" xs={12}>
                    <Carousel images={product.images} />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>{product.name}</Typography>
                    <Typography
                      variant="body2" color="textSecondary" component="p">
                      {product.description}
                    </Typography>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Grid container item spacing={2} xs={12} direction="row" alignItems="center" justify="center">
                    <Grid item xs={6} container justify="center">
                      <Button color="primary" variant="outlined" size="large">Yup</Button>
                    </Grid>
                    <Grid item xs={6} container justify="center">
                      <Button color="secondary" variant="outlined" size="large">Nope</Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Grid>
            </Grid>
          )
        })
      }
    </>
  )
}




export default ListOfProduct