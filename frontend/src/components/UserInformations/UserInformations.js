import React from 'react'
import {
  Button, Grid, TextField, Typography, MenuItem,
  InputLabel, Select, Input, Checkbox, ListItemText, FormControl, Divider, Chip, Paper
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import LoginContext from '../ContextAuth'
import Map from '../Map'
import MyModal from '../Mymodal'
import { useAxios } from '../useHooks/'

const UserInformations = () => {
  const { userData, type } = React.useContext(LoginContext)
  const [modalOpen, setModalOpen] = React.useState(false)
  const refNewType = React.useRef()
  const [data, loading, error, setConfig] = useAxios({})

  const formik = useFormik({
    initialValues: {
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || ''
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
    onSubmit: values => {
      values = { ...values, userType: type }
      const config = {
        url: process.env.REACT_APP_UPDATE_USER,
        data: {
          type: type,
          userId: userData._id,
          forUpdate: {
            ...values,
          }
        },
        method: 'POST'
      }
      setConfig(config)
    }
  })
  React.useEffect(() => {
    if (error) {
      console.log("error : ", error, data)
    }
  }, [error])

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
    onSubmit: values => {
      values = { ...values, userType: type }
      const config = {
        url: '/api/user/auth/setPassword',
        data: values,
        method: 'POST'
      }
      setConfig(config)
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