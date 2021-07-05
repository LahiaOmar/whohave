import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup';

import CountrySelector from '../CountrySelector'
import { StoresType } from '../StoresType'

const StoreInformation = ({
  formikValidator,
  stepIndex,
  activeStep,
}) => {

  if (activeStep !== stepIndex) {
    return <></>
  }

  return (
    <Grid container item xs={12} justify="center"
      xs={12} spacing={2} component="form" onSubmit={formikValidator.handleSubmit}>
      <Grid item container sm={12} xs={12} spacing={2}>
        <Grid item xs={12}>
          <TextField
            type="text"
            name="name"
            id="name"
            value={formikValidator.values.name}
            onChange={formikValidator.handleChange}
            error={
              formikValidator.touched.name && formikValidator.errors.name
                ? true : false}
            helperText={formikValidator.touched.name && formikValidator.errors.name
              ? formikValidator.errors.name : null}
            size="small"
            variant="outlined"
            fullWidth
            label="Store Name"
          />
        </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            {...formikValidator.getFieldProps('address')}
            error={
              formikValidator.touched.address && formikValidator.errors.address
                ? true : false}
            helperText={formikValidator.touched.address && formikValidator.errors.address
              ? formikValidator.errors.address : null}
            name="address"
            variant="outlined"
            fullWidth
            label="Address"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            type="tel"
            {...formikValidator.getFieldProps('phone')}
            error={
              formikValidator.touched.phone && formikValidator.errors.phone
                ? true : false}
            helperText={formikValidator.touched.phone && formikValidator.errors.phone
              ? formikValidator.errors.phone : null}
            name="phone"
            variant="outlined"
            fullWidth
            label="Store Phone"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <StoresType formik={formikValidator} showAddNewType={true} />
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <CountrySelector formik={formikValidator} />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <button type="submit" style={{ display: 'none' }}></button>
      </Grid>
    </Grid>
  )
}

export default StoreInformation