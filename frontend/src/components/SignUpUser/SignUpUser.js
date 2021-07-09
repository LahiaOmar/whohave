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
import UserInformation from './UserInformation'
import UserCredentials from './UserCredentials'

function SignUpWho() {
	const REDIRECT_PATH = process.env.REACT_APP_LOGIN_REDIRECT
	const labels = ['Personal information', 'Credentials']
	const [activeStep, setActiveStep] = React.useState(0)
	const [stepsComplete, setStepsComplete] = React.useState(new Array(2).fill(false))
	const { alertDispatch } = React.useContext(AlertContext)
	const { authDispatch } = React.useContext(AuthContext)
	const history = useHistory()

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
			onSubmitHandler()
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
			onSubmitHandler()
			finishHandler()
		}
	})

	const setStepsHandler = () => {
		const _steps = [...stepsComplete]
		_steps[activeStep] = true
		setStepsComplete(_steps)
	}

	const onSubmitHandler = () => {
		setStepsHandler()
		setActiveStep(activeStep => activeStep + 1)
	}

	const nextHandler = async () => {
		if (activeStep == 0) {
			await personalInformation.submitForm()
		}
		if (activeStep == 1) {
			await credentials.submitForm()
		}
	}

	const backHandler = () => {
		setActiveStep(activeStep => activeStep - 1 >= 0 ? activeStep - 1 : activeStep)
	}

	const finishHandler = async () => {
		try {
			const user = {
				...personalInformation.values,
				...credentials.values,
			}
			const { userType, information } = await API.signup({
				userType: 'USER',
				userData: user
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
		<Grid container xs={12} spacing={2} className="signup-user" >
			<Stepper
				activeStep={activeStep}
				stepsComplete={stepsComplete}
				labels={labels}
				onNext={nextHandler} onBack={backHandler}>
				<UserInformation formikValidator={personalInformation} />
				<UserCredentials formikValidator={credentials} />
			</Stepper>
		</Grid>
	)
}

export default SignUpWho