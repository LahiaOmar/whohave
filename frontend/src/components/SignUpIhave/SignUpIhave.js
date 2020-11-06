import React from 'react'
import {
	Button, Grid, TextField, Typography, MenuItem,
	InputLabel, Select, Input, Checkbox, ListItemText, FormControl
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useAxios } from '../useHooks'
import LoginContext from '../ContextAuth'
import { StoresType, NewStoreType } from '../StoresType'
import Map from '../Map'
import MyMarker from '../MyMarker';
import MyModal from '../Mymodal'

function SignUpIhave({ clSubmit, error, loading, label }) {

	const [modalOpen, setModalOpen] = React.useState(false)

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			address: '',
			email: '',
			location: [],
			storeTypes: [],
			password: '',
			confirmPassword: '',
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
			location: Yup.array()
				.required("must specifie your position onno the map"),
			storeTypes: Yup.array()
				.min(1, 'you must select the type(s) of service that your store provide!'),
			password: Yup.string()
				.min(6, 'must have at least 6 characters')
				.matches('[a-z0-9]', 'must have alphabetic characters and digits')
				.required('must have a password'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), null], 'Passwords must match'),
		}),
		onSubmit: values => {
			const config = {
				url: process.env.REACT_APP_PATH_SIGNUP_STORE,
				data: values,
				method: 'POST'
			}
			console.log(config)
			clSubmit(config)
		}
	})

	const selfPositionOnChange = (lngLat) => {
		const { longitude, latitude } = lngLat
		formik.setFieldValue('location', [longitude, latitude])
	}
	return (
		<form className="form-signup" onSubmit={formik.handleSubmit} autoComplete="off">
			<Grid container justify="center" alignItems="center">
				<AccountCircle style={{ fontSize: 100, color: 'blue' }} />
				<Typography component="h1" variant="h5">
					{label}
				</Typography>
			</Grid>

			<Grid id container spacing={2}>
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
						{...formik.getFieldProps('address')}
						error={
							formik.touched.address && formik.errors.address
								? true : false}
						helperText={formik.touched.address && formik.errors.address
							? formik.errors.address : null}
						name="address"
						variant="outlined"
						fullWidth
						label="Address"
						size="small"
					/>
				</Grid>
				<Grid item xs={12}  >
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
				<Grid item xs={12}>
					<MyModal
						btnTitle="Set Your Position"
						open={modalOpen}
						handleOpen={() => setModalOpen(true)}
						handleClose={() => setModalOpen(false)}
					>
						<Map
							selfPositionOnChange={selfPositionOnChange}
						>
						</Map>
					</MyModal>
				</Grid>
				<Grid item xs={12}>
					<StoresType formik={formik} showAddNewType={true} />
				</Grid>
				<Grid item xs={12}  >
					<TextField
						{...formik.getFieldProps('password')}
						error={
							formik.touched.password && formik.errors.password
								? true : false}
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
				<Grid item xs={12}  >
					<TextField
						{...formik.getFieldProps('confirmPassword')}
						error={
							formik.touched.confirmPassword && formik.errors.confirmPassword
								? true : false}
						helperText={formik.touched.confirmPassword && formik.errors.confirmPassword
							? formik.errors.confirmPassword
							: null}
						size="small"
						name="confirmPassword"
						variant="outlined"
						fullWidth
						type="password"
						label="Confirmation Password"
					/>
				</Grid>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
				>
					Sign Up
							</Button>
			</Grid>
		</form>
	)
}

export default SignUpIhave