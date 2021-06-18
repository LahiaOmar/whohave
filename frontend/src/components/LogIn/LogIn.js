import React from 'react'
import LoginContext from '../ContextAuth'
import AlertMessage from '../AlertMessage'
import { ALERT_ERROR } from '../../constants/constants'
import { Button, Grid, TextField, Typography, FormControlLabel, Radio, FormLabel, RadioGroup, Container } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'

import { useFormik } from 'formik'
import * as Yup from 'yup'
import CircularProgress from '@material-ui/core/CircularProgress';

function LogIn({ clSubmit, error, loading }) {
	const [alertError, setAlertError] = React.useState(null)

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
		onSubmit: function (values) {
			const config = {
				url: process.env.REACT_APP_PATH_LOGIN,
				data: values,
				method: 'POST'
			}
			clSubmit(config)
		}
	})

	React.useEffect(() => {
		if (error.status) {
			setAlertError(ALERT_ERROR.LOGIN_FAILD)
		}
	}, [error])

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
					<RadioGroup >
						<FormControlLabel
							value="store"
							control={<Radio
								id="checkStore"
								name="checkStore"
								onChange={() => {
									formik.setFieldValue('userType', 'STORE')
								}}
							/>}
							label="store owner" />
						<FormControlLabel
							value="user"
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
						helperText={formik.touched && formik.errors.password
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
				<Grid item xs={12}>
					{
						loading && <CircularProgress />
					}
				</Grid>
				<Grid item xs={12}>
					<AlertMessage error={alertError} />
				</Grid>
			</Grid>
		</div>
	)
}

export default LogIn