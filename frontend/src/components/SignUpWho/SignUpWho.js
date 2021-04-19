import React from 'react'
import { Button, Grid, Stepper, Step, StepLabel, TextField, Typography } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useFormik } from 'formik'
import * as Yup from 'yup';

function SignUpWho({ clSubmit, label }) {
	const [activeStep, setActiveStep] = React.useState(0)
	const personalInformation = useFormik({
		initialValues: {
			firstName: '',
			lastName: ''
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.max(20, 'Must have less than 20 characters')
				.required('required !'),
			lastName: Yup.string()
				.max(20, 'Must have less than 20 characters')
				.required('required !'),
		}),
		onSubmit: values => {
			setActiveStep(activeStep =>
				activeStep + 1 <= 1 ? activeStep + 1 : activeStep)
		}
	})
	const credentials = useFormik({
		initialValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email('format not allowed!')
				.required('required !'),
			password: Yup.string()
				.min(6, 'must have at least 6 characters')
				.matches('[a-z0-9]', 'must have alphabetic characters and digits')
				.required('must have a password'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), null], 'Passwords must match'),
		}),
		onSubmit: values => {
			setActiveStep(activeStep =>
				activeStep + 1 <= 1 ? activeStep + 1 : activeStep)
		}
	})
	const nextHandler = () => {
		console.log("next ", activeStep)
		if (activeStep == 0) {
			personalInformation.submitForm()
				.then((res) => console.log("res ", res))
				.catch(err => console.log("err", err))
		}
		if (activeStep == 1) {
			credentials.submitForm()
				.then(() => { })
		}
	}

	const backHandler = () => {
		setActiveStep(activeStep => activeStep - 1 >= 0 ? activeStep - 1 : activeStep)
	}

	const finishHandler = () => {
		const user = {
			...personalInformation.values,
			...credentials.values,
		}
		console.log("user ", user)
		const config = {
			url: process.env.REACT_APP_PATH_SIGNUP,
			data: {
				userData: user,
				userType: 'USER'
			},
			method: 'POST'
		}
		clSubmit(config)
	}
	return (
		<Grid container xs={12} spacing={2} className="signup-user" >
			<Grid item xs={12}>
				<Stepper activeStep={activeStep}>
					<Step>
						<StepLabel>Personal information</StepLabel>
					</Step>
					<Step>
						<StepLabel>Credentials</StepLabel>
					</Step>
				</Stepper>
			</Grid>
			<Grid item container xs={12} className="stepper-content">
				{
					(activeStep === 0)
					&&
					<Grid item container xs={12} spacing={2} component="form" onSubmit={personalInformation.handleSubmit}>
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
						<button type="submit" style={{ display: 'none' }}></button>
					</Grid>
				}
				{
					(activeStep === 1)
					&&
					<Grid item container xs={12} spacing={2} component="form" onSubmit={credentials.handleSubmit}>
						<Grid item xs={12}>
							<TextField
								{...credentials.getFieldProps('email')}
								error={
									credentials.touched.email && credentials.errors.email
										? true : false}
								helperText={credentials.touched.email && credentials.errors.email
									? credentials.errors.email : null}
								size="small"
								name="email"
								variant="outlined"
								fullWidth
								label="email"
							/>
						</Grid>
						<Grid item xs={12}  >
							<TextField
								{...credentials.getFieldProps('password')}
								error={
									credentials.touched.password && credentials.errors.password
										? true : false}
								helperText={credentials.touched.password && credentials.errors.password
									? credentials.errors.password : null}
								size="small"
								name="password"
								variant="outlined"
								fullWidth
								type="password"
								label="Password"
							/>
						</Grid>
						<Grid item xs={12}  >
							<TextField
								{...credentials.getFieldProps('confirmPassword')}
								error={
									credentials.touched.confirmPassword && credentials.errors.confirmPassword
										? true : false}
								helperText={credentials.touched.confirmPassword && credentials.errors.confirmPassword
									? credentials.errors.confirmPassword
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
				}
			</Grid>
			<Grid container spacing={2} xs={12} justify="center" className="stepper-button">
				{
					(activeStep > 0)
					&&
					<Grid item xs={4}>
						<Button
							onClick={() => backHandler()}
							fullWidth
							variant="contained"
							color="primary">
							BACK
						</Button>
					</Grid>
				}
				{
					(activeStep < 1)
					&&
					<Grid item xs={4}>
						<Button
							onClick={() => nextHandler()}
							fullWidth
							variant="contained"
							color="primary">
							NEXT
						</Button>
					</Grid>
				}
				{
					(activeStep === 1)
					&&
					<Grid item xs={4}>
						<Button
							onClick={() => finishHandler()}
							fullWidth
							variant="contained"
							color="primary">
							FINISH
						</Button>
					</Grid>
				}
			</Grid>
		</Grid>
	)
}

export default SignUpWho