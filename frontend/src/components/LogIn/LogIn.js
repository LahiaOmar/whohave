import React from 'react'
import LoginContext from '../ContextAuth'

import {Button, Grid, TextField, Typography, FormControlLabel, Radio, FormLabel, RadioGroup} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'

import {useFormik} from 'formik'
import * as Yup from 'yup'
import {useAxios} from '../useHooks'
import CircularProgress from '@material-ui/core/CircularProgress';

function LogIn(props) {
	const context = React.useContext(LoginContext)
	const [data, error, loading, setConfig] = useAxios({})
	React.useEffect(()=>{
		if(data){
			const type = formik.values.checkStore
			context.setContext({
				isLoged : true,
				type : type,
				userData : data.information,
				redirect : {
					ok : true,
					to : "/dashboard"
				}
			})
		}
	}, [data])

	const formik = useFormik({
		initialValues:{
				email:'',
				password:'',
				checkStore : true,
				checkUser : false
		},
		validationSchema : Yup.object({
				email : Yup.string().email("invalid email !").required("Email required !"),
				password : Yup.string().required("Password Required !"),
				checkStore : Yup.bool(),
				checkUser : Yup.bool()
		}),
		onSubmit :function(values){
			const config = {
				url : process.env.REACT_APP_PATH_LOGIN,
				data : values,
				method : 'POST' 
			}
			setConfig(config)
		}
})

return(
	<form className="form-signup" onSubmit={formik.handleSubmit} autoComplete="off">
		<Grid container justify="center" alignItems="center">
				<AccountCircle style={{fontSize:100, color:'blue'}}/>
				<Typography component="h1" variant="h5">
						LogIn
				</Typography>
		</Grid>
		<Grid id container spacing={2}>
			<Grid item xs={12}>
				<FormLabel >Are you :  </FormLabel>
				<RadioGroup >
					<FormControlLabel
						value="store"
						control={<Radio
								id="checkStore"
								name="checkStore"
								onChange={()=>{
									formik.setFieldValue('checkStore' , true)
									formik.setFieldValue('checkUser', false)
								}}
								checked={formik.values.checkStore}
							/>}
						label="store owner" />
					<FormControlLabel 
						value="user"
						control={<Radio 
							id="checkUser"
							name="checkUser"
							onChange={()=>{
								formik.setFieldValue('checkStore' , false)
								formik.setFieldValue('checkUser', true)
							}}
							checked={formik.values.checkUser}
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
												?formik.errors.password : null}
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
				<p>{error}</p>
			</Grid>
		</Grid>
	</form>    
)
}

export default LogIn