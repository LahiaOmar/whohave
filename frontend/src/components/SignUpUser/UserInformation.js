import React from 'react'
import { Grid, TextField } from '@material-ui/core'

const UserInformation = ({
  formikValidator,
  stepIndex,
  activeStep
}) => {
  if (activeStep !== stepIndex)
    return <></>

  return (
    <Grid item container xs={12} spacing={2} component="form" onSubmit={formikValidator.handleSubmit}>
      <Grid item xs={12} sm={6} >
        <TextField
          {...formikValidator.getFieldProps('firstName')}
          error={
            formikValidator.touched.firstName && formikValidator.errors.firstName
              ? true : false}
          helperText={formikValidator.touched.firstName && formikValidator.errors.firstName
            ? formikValidator.errors.firstName : null}
          name="firstName"
          variant="outlined"
          fullWidth
          label="First Name"
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6} >
        <TextField
          {...formikValidator.getFieldProps('lastName')}
          error={
            formikValidator.touched.lastName && formikValidator.errors.lastName
              ? true : false}
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

export default UserInformation