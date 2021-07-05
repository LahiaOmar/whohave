import React from 'react'
import { Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Map from '../Map'

const StorePosition = ({
  formikValidator,
  stepIndex,
  activeStep
}) => {
  const userPositionHandler = (coordinates) => {
    formikValidator.setFieldValue('location', { coordinates })
  }

  if (activeStep !== stepIndex)
    return <></>

  return (
    <Grid container item xs={12}>
      <Grid item container xs={12} component="form" onSubmit={formikValidator.handleSubmit}>
        <Map style={{
          width: '100%',
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