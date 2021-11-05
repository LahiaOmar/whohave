import React from 'react'
import {
  Grid,
  Fab,
  Badge,
  Tooltip,
  makeStyles,
  Typography,
  IconButton,
  Button
} from '@material-ui/core'
import './style.css'
import Carousel from '../Carousel'
import StoreIcon from '@material-ui/icons/Store'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
      alignItems: 'center'
    }
  },
  card: {
    border: `2px solid ${theme.palette.primary['light']}`,
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    width: '360px',
  },
  actions: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row'
    }
  }
}))

const UserCard = ({ product, showResponses }) => {
  const classes = useStyles()

  return (
    <Grid container item className={classes.root} justify="center" xs={12} sm={10} md={9}>
      <Grid container className={classes.card}
        xs={12} sm={8} md={8}
        justify="center" alignItems="center">
        <Grid item xs={12}>
          <Carousel images={product.images} />
        </Grid>
        <Grid container item xs={12}>
          <Grid item style={{ padding: '8px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>{product.name}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="body2" color="textSecondary" component="p">
                  {product.description}
                </Typography>
              </Grid>
              <Grid container item xs={12} item justifu="center">
                <Grid item xs={6}>
                  <Grid container justify="center">
                    <Button
                      size="medium"
                      // style={{ padding: '10px' }}
                      variant="outlined"
                      color="primary"
                      startIcon={
                        <StoreIcon fontSize="medium" />
                      }
                    >
                      Responses
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container justify="center">
                    <Button
                      size="medium"
                      // style={{ padding: '10px' }}
                      variant="outlined" color="secondary"
                      startIcon={
                        <DeleteIcon fontSize="small" />
                      }
                    >
                      delete
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Grid >
  )

}

export default UserCard