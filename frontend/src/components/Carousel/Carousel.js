import React from 'react'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Paper from '@material-ui/core/Paper'
import { Box } from '@material-ui/core';

import './style.css'

const Carousel = ({ images }) => {
  const [trValue, setTrValue] = React.useState(0)
  const trStep = 400
  const PRODUCT_IMAGE_URL = process.env.REACT_APP_GET_PRODUCT_IMAGE

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
    <Paper id="carousel" elevation={3}>
      <h2 id="carousel-title">Product Images</h2>
      <Box borderColor="primary.main" id="carousel-container">
        <div id="carousel-container-btn">
          <NavigateBeforeIcon className="carousel-btn" fontSize="large" onClick={prevHandler} />
          <NavigateNextIcon className="carousel-btn" fontSize="large" onClick={nextHandler} />
        </div>
        <div id="carousel-container-images" style={{
          transform: `translate(${trValue}px, 0px)`,
          transition: 'transform 1s',
        }}>
          {
            images.map((image) => {
              return <img
                className="carousel-image"
                alt="product image"
                src={`${PRODUCT_IMAGE_URL}${image}`} />
            })
          }
        </div>
      </Box>
    </Paper>
  )
}

export default Carousel