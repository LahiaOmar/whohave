import React from 'react'
import {Button, Grid, TextField, Typography, MenuItem,
InputLabel, Select, Input, Checkbox, ListItemText, FormControl} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'
import {useFormik} from 'formik'
import * as Yup from 'yup';
import {useAxios} from '../useHooks'
import LoginContext from '../ContextAuth'

function SignUpIhave(props){
	const context = React.useContext(LoginContext)
	const [data, error, loading, setConfig] = useAxios({})

	const names = [
		"tech"
	];

	React.useEffect(()=>{
		if(data){
			context.setContext({
				isLoged : true,
				type : true,
				userData : data.data,
				redirect : {
					ok : true,
					to : "/dashboard"
				}
			})
		}
	}, [data])

	const formik = useFormik({
		initialValues : {
			firstName : '',
			lastName : '',
			address : '',
			email : '',
			storeTypes : [],
			password : '',
			confirmPassword : '',
		},
		validationSchema : Yup.object({
			firstName : Yup.string()
				.max(20, 'Must have less than 20 characters')
				.required('required !'),
			lastName : Yup.string()
				.max(20, 'Must have less than 20 characters')
				.required('required !'),
			address : Yup.string()
				.required('required !'),
			email : Yup.string()
				.email('format not allowed!')
				.required('required !'),
			storeTypes : Yup.array()
				.min(1, 'you must select the type(s) of service that your store provide!'),
			password : Yup.string()
				.min(6, 'must have at least 6 characters')
				.matches('[a-z0-9]', 'must have alphabetic characters and digits')
				.required('must have a password'),
			confirmPassword : Yup.string()
				.oneOf([Yup.ref('password'), null], 'Passwords must match'),
		}),
		onSubmit : values =>{
			const config = {
				url : process.env.REACT_APP_PATH_SIGNUP_STORE,
				data : values,
				method : 'POST' 
			}
			setConfig(config)
		}
})

return (
				<form className="form-signup" onSubmit={formik.handleSubmit} autoComplete="off">
					<Grid container justify="center" alignItems="center">
						<AccountCircle style={{fontSize:100, color:'blue'}}/>
						<Typography component="h1" variant="h5">
								{props.label}
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
													?formik.errors.firstName : null}
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
												?formik.errors.lastName : null}
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
												?formik.errors.address : null}
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
												?formik.errors.email : null}
										size="small"
										name="email"
										variant="outlined"
										fullWidth
										label="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControl className="multi-select-form">
									<InputLabel id="store-types">Store Types</InputLabel>
									<Select
										{...formik.getFieldProps('storeTypes')}
										error={
											formik.touched.storeTypes && formik.errors.storeTypes 
											? true : false}
										helperText={formik.touched.storeTypes && formik.errors.storeTypes 
											?formik.errors.storeTypes : null}
										labelId="store-types"
										id="demo-mutiple-checkbox"
										multiple
										input={<Input />}
										renderValue={(selected) => selected.join(', ')}
									>
										{names.map((name) => (
											<MenuItem key={name} value={name}>
												<Checkbox checked={formik.values.storeTypes.indexOf(name) > -1} />
												<ListItemText primary={name} />
											</MenuItem>
										))}
									</Select>	
								</FormControl>		
							</Grid>
							<Grid item xs={12}  >
								<TextField
										{...formik.getFieldProps('password')}
										error={
												formik.touched.password && formik.errors.password 
												? true : false}
										helperText={ formik.touched.password && formik.errors.password
												?formik.errors.password : null} 
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
												?true : false}
										helperText={ formik.touched.confirmPassword && formik.errors.confirmPassword
												?formik.errors.confirmPassword
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