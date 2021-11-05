import React from 'react'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Paper from '@material-ui/core/Paper'
import { Grid, makeStyles } from '@material-ui/core';

import './style.css'

const WIDTH = 350
const HEIGHT = 300

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '8px',
  },
  container: {
    position: 'relative',
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
    maxWidth: `${WIDTH}px`,
    height: `${HEIGHT}px`,
    overflow: 'hidden',
  },
  buttonsContainer: {
    position: 'absolute',
    display: 'flex',
    zIndex: '1',
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttons: {
    cursor: 'pointer'
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    width: `${WIDTH}px`,
    height: `${HEIGHT}px`,
  }

}))

const Carousel = ({ images }) => {
  const [trValue, setTrValue] = React.useState(0)
  const trStep = WIDTH
  const PRODUCT_IMAGE_URL = process.env.REACT_APP_GET_PRODUCT_IMAGE
  const classes = useStyles()

  const nextHandler = () => {
    const maxNext = images.length * trStep
    const tr = trValue - trStep
    if (tr > -maxNext)
      setTrValue(tr)
  }
  const prevHandler = () => {
    const tr = trValue + trStep
    if (tr <= 0)
      setTrValue(tr)
  }

  return (
    <Grid container justify="center" alignItems="center" alignContent="center" className={classes.root} component={Paper} elevation={0}>
      <Grid container className={classes.container} justify="center">
        <Grid item xs={12} className={classes.buttonsContainer}>
          <NavigateBeforeIcon className={classes.buttons} fontSize="large" onClick={prevHandler} />
          <NavigateNextIcon className={classes.buttons} fontSize="large" onClick={nextHandler} />
        </Grid>
        <Grid item xs={12} className={classes.imagesContainer} style={{
          transform: `translate(${trValue}px, 0px)`,
          transition: 'transform 1s',
        }}>
          {
            images.map((image) => {
              return <Grid ><img
                className={classes.image}
                alt="product image"
                src={`${PRODUCT_IMAGE_URL}${image}`} /></Grid>
            })
          }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Carousel