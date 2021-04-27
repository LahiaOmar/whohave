import React from 'react'
import {
  Button, Grid, TextField, Typography
} from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import Map from '../Map'
import useAxios from '../useHooks/useAxios'
import { AuthContext } from '../../Context/AuthProvider';
import { AlertContext } from '../../Context/AlertProvider'
import * as ALERT_ACTIONS from '../../Context/actions/AlertTypes'
import * as AUTH_ACTIONS from '../../Context/actions/AuthTypes'
import Axios from 'axios'
import CountrySelector from '../CountrySelector';

const StoreInformations = () => {
  const { authState: { profile }, authDispatch } = React.useContext(AuthContext)
  const { alertDispatch } = React.useContext(AlertContext)
  const refNewType = React.useRef()
  const [data, loading, error, setConfig] = useAxios({})
  const storePosition = React.useMemo(() => ({
    coordinates: profile.location.coordinates,
    type: profile.userType,
    draggable: true,
  }), [])
  const personalInformation = useFormik({
    initialValues: {
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      address: profile.address || '',
      email: profile.email || '',
      location: profile.location || { coordinates: [] },
      // types: profile.types || [],
      country: profile.country,
      city: profile.city,
      unicodeFlag: profile.unicodeFlag
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(20, 'Must have less than 20 characters')
        .required('required !'),
      lastName: Yup.string()
        .max(20, 'Must have less than 20 characters')
        .required('required !'),
      address: Yup.string()
        .required('required !'),
      email: Yup.string()
        .email('format not allowed!')
        .required('required !'),
      country: Yup.string().required('select a country'),
      city: Yup.string().required('select a city'),
      unicodeFlag: Yup.string()
      // location: Yup.array()
      //   .required("must specifie your position onno the map"),
      // types: Yup.array()
      //   .min(1, 'you must select the type(s) of service that your store provide!')
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
        alertDispatch(ALERT_ACTIONS.updateSuccess())
        authDispatch(AUTH_ACTIONS.login({ userType: data.userType, ...data.userData }))

      }
      catch (ex) {
        console.log("ex ", ex)
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
    onSubmit: async (values, { resetForm }) => {
      try {
        const config = {
          url: process.env.REACT_APP_UPDATE_UPDATE_PASSWORD,
          data: values,
          method: 'POST'
        }
        const { data } = await Axios(config)
        alertDispatch(ALERT_ACTIONS.updateSuccess())
        resetForm()
        authDispatch(AUTH_ACTIONS.login({ userType: data.userType, ...data.userData }))
      }
      catch (ex) {
        console.log("ex ", ex)
        alertDispatch(ALERT_ACTIONS.updateFailure())
      }
    }
  })

  const addNewType = () => {
    const newType = refNewType.current.value
    personalInformation.setFieldValue('types', personalInformation.values.types.concat(newType))
  }

  const deleteType = (typeName) => {

    console.log("typeName", typeName)
    const config = {
      url: process.env.REACT_APP_UPDATE_USER,
      data: {
        forUpdate: {
          $pull: {
            storeTypes: {
              $in: [typeName]
            }
          }
        }
      },
      method: 'POST'
    }
    setConfig(config)
    personalInformation.setFieldValue('types', personalInformation.values.types.filter(cur => cur !== typeName))
  }

  const changePosition = ({ target }) => {
    const lngLat = target.getLngLat()
    personalInformation.setFieldValue('location', { coordinates: [lngLat.lng, lngLat.lat] })
  }
  return (
    <Grid className="form-signup" container spacing={2}>
      <Grid container item spacing={2} component="form" onSubmit={personalInformation.handleSubmit}>
        <Grid container justify="center" alignItems="center">
          <Typography component="h1" variant="h5">
            Update Your Informations
            </Typography>
        </Grid>
        <Grid item container xs={6} spacing={2}>
          <Grid item xs={12} sm={6} >
            <TextField
              {...personalInformation.getFieldProps('firstName')}
              error={
                personalInformation.touched.firstName && personalInformation.errors.firstName
                  ? true : false}
              helperText={personalInformation.touched.firstName && personalInformation.errors.firstName
                ? personalInformation.errors.firstName : null}
              name="firstName"
              variant="outlined"
              fullWidth
              label="First Name"
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              {...personalInformation.getFieldProps('lastName')}
              error={
                personalInformation.touched.lastName && personalInformation.errors.lastName
                  ? true : false}
              helperText={personalInformation.touched.lastName && personalInformation.errors.lastName
                ? personalInformation.errors.lastName : null}
              name="lastName"
              variant="outlined"
              fullWidth
              label="Last Name"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...personalInformation.getFieldProps('address')}
              error={
                personalInformation.touched.address && personalInformation.errors.address
                  ? true : false}
              helperText={personalInformation.touched.address && personalInformation.errors.address
                ? personalInformation.errors.address : null}
              name="address"
              variant="outlined"
              fullWidth
              label="Address"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...personalInformation.getFieldProps('email')}
              error={
                personalInformation.touched.email && personalInformation.errors.email
                  ? true : false}
              helperText={personalInformation.touched.email && personalInformation.errors.email
                ? personalInformation.errors.email : null}
              size="small"
              name="email"
              variant="outlined"
              fullWidth
              label="email"
            />
          </Grid>
          <Grid container item spacing={2} xs={12}>
            <CountrySelector formik={personalInformation} />
          </Grid>
        </Grid>
        <Grid item container xs={6}>
          <Map
            selfLocation={{ ...storePosition, changePosition }}
          >
          </Map>
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

export default StoreInformations