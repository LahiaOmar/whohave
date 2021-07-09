import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup';

const OwnerInformation = ({
  formikValidator,
  submitFrom,
  stepIndex,
  activeStep
}) => {

  if (stepIndex !== activeStep)
    return <></>

  return (
    <Grid container item xs={12} spacing={2} justify="center" component="form" onSubmit={formikValidator.handleSubmit}>
      <Grid item xs={12}>
        <TextField
          {...formikValidator.getFieldProps('firstName')}
          error={
            formikValidator.touched.firstName && formikValidator.errors.firstName
          }
          helperText={formikValidator.touched.firstName && formikValidator.errors.firstName
            ? formikValidator.errors.firstName : null}
          name="firstName"
          variant="outlined"
          fullWidth
          label="First Name"
          size="small"
          id="firstName"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...formikValidator.getFieldProps('lastName')}
          error={
            formikValidator.touched.lastName && formikValidator.errors.lastName
          }
          helperText={formikValidator.touched.lastName && formikValidator.errors.lastName
            ? formikValidator.errors.lastName : null}
          name="lastName"
          variant="outlined"
          fullWidth
          label="Last Name"
          size="small"
        />
      </Grid>
      <button type="submit" style={{ display: 'none' }}></button>
    </Grid>
  )
}

export default OwnerInformation