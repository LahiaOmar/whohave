import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import Map from '../Map'

const useStyles = makeStyles((theme) => ({
  mapBrderError: {
    border: `1px solid ${theme.palette.error.main}`
  },
}))

const StorePosition = ({
  formikValidator,
  stepIndex,
  activeStep
}) => {

  const classes = useStyles()

  const userPositionHandler = (coordinates) => {
    formikValidator.setFieldValue('location', { coordinates })
  }

  if (activeStep !== stepIndex)
    return <></>

  return (
    <Grid container item xs={12}>
      <Grid item container xs={12} spacing={2}
        component="form"
        onSubmit={formikValidator.handleSubmit}>
        <Map
          className={formikValidator.errors.location ? classes.mapBrderError : ''}
          style={{
            height: '350px',
          }} selfLocation={
            { coordinates: [], draggable: true, changePosition: userPositionHandler }
          } />
        <p style={{ color: 'red' }}>
          {
            formikValidator.errors.location ? 'You must select the store location' : ''
          }
        </p>
      </Grid>
      <Grid item xs={12}>
        <button type="submit" style={{ display: 'none' }}></button>
      </Grid>
    </Grid>
  )
}

export default StorePosition