import React from 'react'
import {
  Button, Grid, TextField, Typography
} from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import useAxios from '../useHooks/useAxios'
import { AuthContext } from '../../Context/AuthProvider'
import { AlertContext } from '../../Context/AlertProvider'
import * as ALERT_ACTIONS from '../../Context/actions/AlertTypes'
import * as AUTH_ACTIONS from '../../Context/actions/AuthTypes'
import Axios from 'axios'

const UserInformations = () => {
  const { authState: { profile }, authDispatch } = React.useContext(AuthContext)
  const { alertDispatch } = React.useContext(AlertContext)
  const [modalOpen, setModalOpen] = React.useState(false)
  const refNewType = React.useRef()
  const [data, loading, error, setConfig] = useAxios({})

  const formik = useFormik({
    initialValues: {
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      email: profile.email || ''
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, 'Must have less than 20 characters')
        .required('required !'),
      lastName: Yup.string()
        .max(20, 'Must have less than 20 characters')
        .required('required !'),
      email: Yup.string()
        .email('format not allowed!')
        .required('required !')
    }),
    onSubmit: async (values) => {
      try {
        const config = {
          url: process.env.REACT_APP_UPDATE_USER,
          data: {
            forUpdate: {
              ...values,
            }
          },
          method: 'POST'
        }
        const { data } = await Axios(config)
        console.log("data response ", data)
        alertDispatch(ALERT_ACTIONS.updateSuccess())
        authDispatch(AUTH_ACTIONS.login({ userType: data.userType, ...data.userData }))
      }
      catch (ex) {
        alertDispatch(ALERT_ACTIONS.updateFailure())
      }
    }
  })

  const changePassword = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(6, 'must have at least 6 characters')
        .matches('[a-z0-9]', 'must have alphabetic characters and digits')
        .required('must have a password'),
      newPassword: Yup.string()
        .min(6, 'must have at least 6 characters')
        .matches('[a-z0-9]', 'must have alphabetic characters and digits')
        .required('must have a password'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    }),
    onSubmit: async (values) => {
      try {
        const config = {
          url: process.env.REACT_APP_UPDATE_UPDATE_PASSWORD,
          data: values,
          method: 'POST'
        }
        const { data } = await Axios(config)
        console.log("data response ", data)
        alertDispatch(ALERT_ACTIONS.updateSuccess())
      }
      catch (ex) {
        alertDispatch(ALERT_ACTIONS.updateFailure())
      }
    }
  })

  return (
    <Grid className="form-signup" container spacing={2}>
      <Grid container item spacing={2} component="form" onSubmit={formik.handleSubmit}>
        <Grid container justify="center" alignItems="center">
          <Typography component="h1" variant="h5">
            Update Your Informations
            </Typography>
        </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            {...formik.getFieldProps('firstName')}
            error={
              formik.touched.firstName && formik.errors.firstName
                ? true : false}
            helperText={formik.touched.firstName && formik.errors.firstName
              ? formik.errors.firstName : null}
            name="firstName"
            variant="outlined"
            fullWidth
            label="First Name"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={6} >
          <TextField
            {...formik.getFieldProps('lastName')}
            error={
              formik.touched.lastName && formik.errors.lastName
                ? true : false}
            helperText={formik.touched.lastName && formik.errors.lastName
              ? formik.errors.lastName : null}
            name="lastName"
            variant="outlined"
            fullWidth
            label="Last Name"
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...formik.getFieldProps('email')}
            error={
              formik.touched.email && formik.errors.email
                ? true : false}
            helperText={formik.touched.email && formik.errors.email
              ? formik.errors.email : null}
            size="small"
            name="email"
            variant="outlined"
            fullWidth
            label="email"
          />
        </Grid>
        <Grid item justify="center" xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary">
            update informations
          </Button>
        </Grid>
      </Grid>
      <Grid container item spacing={2} component="form" onSubmit={changePassword.handleSubmit} xs={12} >
        <Grid container item justify="center" alignItems="center">
          <Typography component="h1" variant="h5">
            Update Password
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...changePassword.getFieldProps('oldPassword')}
            error={
              changePassword.touched.oldPassword && changePassword.errors.oldPassword
                ? true : false}
            helperText={changePassword.touched.oldPassword && changePassword.errors.oldPassword
              ? changePassword.errors.oldPassword : null}
            size="small"
            name="oldPassword"
            variant="outlined"
            fullWidth
            type="password"
            label="Old Password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...changePassword.getFieldProps('newPassword')}
            error={
              changePassword.touched.newPassword && changePassword.errors.newPassword
                ? true : false}
            helperText={changePassword.touched.newPassword && changePassword.errors.newPassword
              ? changePassword.errors.newPassword : null}
            size="small"
            name="newPassword"
            variant="outlined"
            fullWidth
            type="password"
            label="New Password"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...changePassword.getFieldProps('confirmPassword')}
            error={
              changePassword.touched.confirmPassword && changePassword.errors.confirmPassword
                ? true : false}
            helperText={changePassword.touched.confirmPassword && changePassword.errors.confirmPassword
              ? changePassword.errors.confirmPassword
              : null}
            size="small"
            name="confirmPassword"
            variant="outlined"
            fullWidth
            type="password"
            label="Confirmation New Password"
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Update Password
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserInformations