import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Map from '../Map'

const StoreCredentials = ({
  formikValidator,
  stepIndex,
  activeStep
}) => {

  if (activeStep !== stepIndex)
    return <></>

  return (
    <Grid item container xs={12} spacing={2} component="form" onSubmit={formikValidator.handleSubmit}>
      <Grid item xs={12}>
        <TextField
          {...formikValidator.getFieldProps('email')}
          error={
            formikValidator.touched.email && formikValidator.errors.email
              ? true : false}
          helperText={formikValidator.touched.email && formikValidator.errors.email
            ? formikValidator.errors.email : null}
          size="small"
          name="email"
          variant="outlined"
          fullWidth
          label="email"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...formikValidator.getFieldProps('password')}
          error={
            formikValidator.touched.password && formikValidator.errors.password
              ? true : false}
          helperText={formikValidator.touched.password && formikValidator.errors.password
            ? formikValidator.errors.password : null}
          size="small"
          name="password"
          variant="outlined"
          fullWidth
          type="password"
          label="Password"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...formikValidator.getFieldProps('confirmPassword')}
          error={
            formikValidator.touched.confirmPassword && formikValidator.errors.confirmPassword
              ? true : false}
          helperText={formikValidator.touched.confirmPassword && formikValidator.errors.confirmPassword
            ? formikValidator.errors.confirmPassword
            : null}
          size="small"
          name="confirmPassword"
          variant="outlined"
          fullWidth
          type="password"
          label="Confirmation Password"
        />
      </Grid>
      <button type="submit" style={{ display: 'none' }}></button>
    </Grid>
  )
}

export default StoreCredentials