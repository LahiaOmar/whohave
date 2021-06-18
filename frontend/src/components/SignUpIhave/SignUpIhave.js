import React from 'react'
import { Button, Grid, Stepper, Step, StepLabel, TextField, makeStyles, Hidden } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { StoresType } from '../StoresType'
import Map from '../Map'
import CountrySelector from '../CountrySelector';

const useStyles = makeStyles((theme) => ({
	mapBrderError: {
		border: `1px solid ${theme.palette.error.main}`
	},
}))

function SignUpIhave({ clSubmit, label }) {
	const [activeStep, setActiveStep] = React.useState(0)
	const [storeCoord, setStoreCoord] = React.useState(null)
	const [stepsLabels] = React.useState(['Personal information', 'Store information', 'Store Position', 'Credentials'])
	const [stepsComplete, setStepsComplete] = React.useState(new Array(4).fill(false))

	const classes = useStyles()

	const STEP_START = 0, STEP_END = 3
	const USER_INFORMATION = 0
	const STORE_INFORMATION = 1
	const STORE_CREDENTIELS = 3
	const STORE_POSITION = 2

	React.useEffect(() => {
		if (activeStep > 0) {
			setStepsComplete(steps => steps.map((step, ind) => {
				return (ind === activeStep - 1)
			}))
		}
	}, [activeStep])

	const personalInformation = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
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
			setActiveStep(activeStep => activeStep + 1 <= 3 ? activeStep + 1 : activeStep)
		}
	})

	const storeInformation = useFormik({
		initialValues: {
			address: '',
			name: '',
			phone: '',
			types: [],
			city: '',
			country: '',
			unicodeFlag: ''
		},
		validationSchema: Yup.object({
			address: Yup.string()
				.required('required !'),
			name: Yup.string()
				.required("required !"),
			phone: Yup.string()
				.matches(/(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/g, 'wrong format'),
			types: Yup.array()
				.min(1, 'the type(s) of service that your store provide!'),

			city: Yup.string()
				.required('select your city !'),
			country: Yup.string()
				.required('select your country !'),
			unicodeFlag: Yup.string()
		}),
		onSubmit: values => {
			console.log("submit, activeStep", activeStep)
			setActiveStep(activeStep => activeStep + 1 <= 3 ? activeStep + 1 : activeStep)
		}
	})

	const storeMapPosition = useFormik({
		initialValues: {
			location: {
				coordinates: []
			},
		},
		validationSchema: Yup.object({
			location: Yup.object()
				.shape({
					coordinates: Yup.array().required('select store position')
				}),
		}),
		onSubmit: values => {
			console.log("submit, activeStep", activeStep)
			setActiveStep(activeStep => activeStep + 1 <= 3 ? activeStep + 1 : activeStep)
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
			setActiveStep(activeStep => activeStep + 1 <= 3 ? activeStep + 1 : activeStep)
		}
	})

	const nextHandler = () => {
		if (activeStep == 0) {
			personalInformation.submitForm()
				.then(() => { })
		}
		if (activeStep == 1) {
			storeInformation.submitForm()
				.then((res) => console.log("res", res))
				.catch(err => console.log("err ", err))
		}
		if (activeStep == 2) {
			storeMapPosition.submitForm()
				.then((res) => console.log("res", res))
				.catch(err => console.log("err ", err))
		}
		if (activeStep == 3) {
			credentials.submitForm()
				.then(() => { })
		}
	}

	const backHandler = () => {
		setActiveStep(activeStep => activeStep - 1 >= 0 ? activeStep - 1 : activeStep)
	}

	const finishHandler = () => {
		const store = {
			...personalInformation.values,
			...storeInformation.values,
			...storeMapPosition.values,
			...credentials.values,
			storeCoord,
		}
		console.log("store ", store)
		const config = {
			url: process.env.REACT_APP_PATH_SIGNUP,
			data: {
				userData: store,
				userType: 'STORE'
			},
			method: 'POST'
		}
		clSubmit(config)
	}
	const userPositionHandler = (coordinates) => {
		storeMapPosition.setFieldValue('location', { coordinates })
	}

	return (
		<Grid container xs={12} className="signup-store" justify="center" alignContent="center" alignItems="center" spacing={2}>
			<Grid item xs={12}>
				<Hidden smUp>
					<Stepper>
						<Step completed={stepsComplete[activeStep]}>
							<StepLabel icon={activeStep + 1}> {stepsLabels[activeStep]} </StepLabel>
						</Step>
					</Stepper>
				</Hidden>
				<Hidden xsDown>
					<Stepper activeStep={activeStep}>
						{
							stepsLabels.map(stepLabel =>
								<Step>
									<StepLabel> {stepLabel} </StepLabel>
								</Step>
							)
						}
					</Stepper>
				</Hidden>
			</Grid>
			<Grid item container xs={12} spacing={2} justify="center" className="stepper-content">
				{
					(activeStep === USER_INFORMATION)
					&&
					<Grid item container xs={12} spacing={1} component="form" onSubmit={personalInformation.handleSubmit}>
						<Grid item xs={12}>
							<TextField
								{...personalInformation.getFieldProps('firstName')}
								error={
									personalInformation.touched.firstName && personalInformation.errors.firstName
								}
								helperText={personalInformation.touched.firstName && personalInformation.errors.firstName
									? personalInformation.errors.firstName : null}
								name="firstName"
								variant="outlined"
								fullWidth
								label="First Name"
								size="small"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								{...personalInformation.getFieldProps('lastName')}
								error={
									personalInformation.touched.lastName && personalInformation.errors.lastName
								}
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
					(activeStep === STORE_INFORMATION)
					&&
					<Grid item container xs={12} justify="center"
						xs={12} spacing={2} component="form" onSubmit={storeInformation.handleSubmit}>
						<Grid item container sm={12} xs={12} spacing={2}>
							<Grid item xs={12}>
								<TextField
									{...storeInformation.getFieldProps('name')}
									error={
										storeInformation.touched.name && storeInformation.errors.name
											? true : false}
									helperText={storeInformation.touched.name && storeInformation.errors.name
										? storeInformation.errors.name : null}
									size="small"
									name="name"
									variant="outlined"
									fullWidth
									label="Store Name"
								/>
							</Grid>
							<Grid item xs={12} sm={6} >
								<TextField
									{...storeInformation.getFieldProps('address')}
									error={
										storeInformation.touched.address && storeInformation.errors.address
											? true : false}
									helperText={storeInformation.touched.address && storeInformation.errors.address
										? storeInformation.errors.address : null}
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
									{...storeInformation.getFieldProps('phone')}
									error={
										storeInformation.touched.phone && storeInformation.errors.phone
											? true : false}
									helperText={storeInformation.touched.phone && storeInformation.errors.phone
										? storeInformation.errors.phone : null}
									name="phone"
									variant="outlined"
									fullWidth
									label="Store Phone"
									size="small"
								/>
							</Grid>
							<Grid item xs={12}>
								<StoresType formik={storeInformation} showAddNewType={true} />
							</Grid>
							<Grid container item xs={12} spacing={2}>
								<CountrySelector formik={storeInformation} />
							</Grid>
						</Grid>
						<Grid item xs={12}>
							<button type="submit" style={{ display: 'none' }}></button>
						</Grid>
					</Grid>
				}
				{
					(activeStep === STORE_POSITION)
					&&
					<Grid container item xs={12}>
						<Grid item container xs={12} component="form" onSubmit={storeMapPosition.handleSubmit}>
							<Map style={{
								width: '100%',
								height: '350px',
							}} selfLocation={
								{ coordinates: [], draggable: true, changePosition: userPositionHandler }
							} />
							<p style={{ color: 'red' }}>
								{
									storeMapPosition.errors.location ? 'You must select the store location' : ''
								}
							</p>
						</Grid>
						<Grid item xs={12}>
							<button type="submit" style={{ display: 'none' }}></button>
						</Grid>
					</Grid>
				}
				{
					(activeStep === STORE_CREDENTIELS)
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
						<Grid item xs={12}>
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
						<Grid item xs={12}>
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
			<Grid item container xs={12} className="stepper-button" justify="center" spacing={2} >
				{
					(activeStep > STEP_START)
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
					(activeStep >= STEP_START && activeStep < STEP_END)
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
					(activeStep === STEP_END)
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

export default SignUpIhave