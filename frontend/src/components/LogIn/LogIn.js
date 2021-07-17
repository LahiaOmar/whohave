import React from 'react'
import { AccountCircle } from '@material-ui/icons'
import { Button, Grid, TextField, Typography, FormControlLabel, Radio, FormLabel, RadioGroup } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'

import API from '../../api/CoreAPI'
import { AlertContext } from '../../Context/AlertProvider'
import { AuthContext } from '../../Context/AuthProvider'
import * as ALERT_TYPES from '../../Context/actions/AlertTypes'
import * as AUTH_TYPES from '../../Context/actions/AuthTypes'

function LogIn() {
	const { alertDispatch } = React.useContext(AlertContext)
	const { authDispatch } = React.useContext(AuthContext)
	const history = useHistory()
	const REDIRECT_PATH = process.env.REACT_APP_LOGIN_REDIRECT

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			userType: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email("invalid email !").required("Email required !"),
			password: Yup.string().required("Password Required !"),
			userType: Yup.string().required('select user type !')
		}),
		onSubmit: async (values) => {
			try {
				const { userType, information } = await API.login(values)
				authDispatch(AUTH_TYPES.login({
					userType,
					...information
				}))
				alertDispatch(ALERT_TYPES.loginSuccess())
				history.push(REDIRECT_PATH)
			}
			catch (ex) {
				alertDispatch(ALERT_TYPES.loginFailure())
			}
		}
	})

	return (
		<div className="auth-modal-contaier">
			<Grid container item justify="center" alignItems="center">
				<AccountCircle style={{ fontSize: 100, color: 'blue' }} />
				<Typography component="h1" variant="h5">
					LogIn
					</Typography>
			</Grid>
			<Grid container component="form" item spacing={2} onSubmit={formik.handleSubmit} autoComplete="off" >
				<Grid item xs={12}>
					<FormLabel >Are you :  </FormLabel>
				</Grid>
				<Grid item xs={12}>
					<RadioGroup >
						<FormControlLabel
							value="Store"
							control={<Radio
								id="checkStore"
								name="checkStore"
								onChange={() => {
									formik.setFieldValue('userType', 'STORE')
								}}
							/>}
							label="store owner" />
						<FormControlLabel
							value="User"
							control={<Radio
								id="checkUser"
								name="checkUser"
								onChange={() => {
									formik.setFieldValue('userType', 'USER')
								}}
							/>}
							label="user" />
					</RadioGroup>
				</Grid>
				<Grid item xs={12}  >
					<TextField
						{...formik.getFieldProps('email')}
						error={formik.touched.email && formik.errors.email}
						helperText={formik.touched.email && formik.errors.email
							? formik.errors.email : null}
						size="small"
						variant="outlined"
						label="email"
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}  >
					<TextField
						{...formik.getFieldProps('password')}
						error={formik.touched.password && formik.errors.password}
						helperText={formik.touched.password && formik.errors.password
							? formik.errors.password : null}
						size="small"
						name="password"
						variant="outlined"
						fullWidth
						type="password"
						label="Password"
					/>
				</Grid>
				<Grid item xs={12}>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary">
						LogIn
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default LogIn