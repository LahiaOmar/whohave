import React from 'react'
import { Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom'

import API from '../../api/CoreAPI'
import { AlertContext } from '../../Context/AlertProvider'
import { AuthContext } from '../../Context/AuthProvider'
import * as ALERT_TYPES from '../../Context/actions/AlertTypes'
import * as AUTH_TYPES from '../../Context/actions/AuthTypes'

import Stepper from '../Stepper'
import StoreInformation from './StoreInformation'
import OwnerInformation from './OwnerInformation'
import StorePosition from './StorePosition'
import StoreCredentials from './StoreCredentials'

function SignUpStore() {
	const [activeStep, setActiveStep] = React.useState(0)
	const [stepsComplete, setStepsComplete] = React.useState(new Array(4).fill(false))
	const [stepsLabels] = React.useState(['Owner information', 'Store information', 'Store Position', 'Credentials'])

	const { alertDispatch } = React.useContext(AlertContext)
	const { authDispatch } = React.useContext(AuthContext)
	const history = useHistory()
	const REDIRECT_PATH = process.env.REACT_APP_LOGIN_REDIRECT

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
			setStepsHandler()
			finishHandler()
		},
	})

	const mapPosition = useFormik({
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
			onSubmitHandler()
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
			onSubmitHandler()
		},
	})

	const personalInformation = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.min(3, 'minimun is 3 caracters')
				.max(20, 'Must have less than 20 characters')
				.required('required !'),
			lastName: Yup.string()
				.min(3, 'minimum is 3 caracters')
				.max(20, 'Must have less than 20 characters')
				.required('required !'),
		}),
		onSubmit: values => {
			onSubmitHandler()
		},
	})

	const onSubmitHandler = () => {
		setStepsHandler()
		setActiveStep(activeStep => activeStep + 1);
	}

	const setStepsHandler = () => {
		const _steps = [...stepsComplete]
		_steps[activeStep] = true
		setStepsComplete(_steps)
	}

	const nextHandler = async () => {
		if (activeStep == 0) {
			await personalInformation.submitForm()
		}
		if (activeStep == 1) {
			await storeInformation.submitForm()
		}
		if (activeStep == 2) {
			await mapPosition.submitForm()
		}
		if (activeStep == 3) {
			await credentials.submitForm()
		}
	}

	const backHandler = () => {
		if (activeStep - 1 >= 0 && stepsComplete[activeStep - 1]) {
			setActiveStep(activeStep => activeStep - 1)
		}
	}

	const finishHandler = async () => {
		try {
			const store = {
				...personalInformation.values,
				...storeInformation.values,
				...mapPosition.values,
				...credentials.values,
			}
			const { userType, information } = await API.signup({
				userType: 'STORE',
				...store
			})
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

	return (
		<Grid container xs={12} className="signup-store" justify="center" alignContent="center" alignItems="center" spacing={2}>
			<Stepper
				activeStep={activeStep}
				stepsComplete={stepsComplete}
				labels={stepsLabels}
				onNext={nextHandler} onBack={backHandler}>
				<OwnerInformation formikValidator={personalInformation} />
				<StoreInformation formikValidator={storeInformation} />
				<StorePosition formikValidator={mapPosition} />
				<StoreCredentials formikValidator={credentials} />
			</Stepper>
		</Grid>
	)
}

export default SignUpStore