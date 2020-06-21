import React from 'react'
import {Button, Grid, TextField, Typography, FormControlLabel, Radio, FormLabel, RadioGroup} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'
import {useFormik} from 'formik'
import * as Yup from 'yup'

function LogIn(props) {

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
		onSubmit : values =>{
			console.log("values ", values)
			fetch('http://localhost:4000/api/auth/login',
				{
					method: 'POST',
					body : JSON.stringify(values),
					headers:{
						'Content-Type' : 'application/json'
					}
				}
			)
			.then((response)=>{
				console.log("body ", response)
			})
			.catch(error=>{

			})
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
			<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
							>
									LogIn
							</Button>
		</Grid>
	</form>    
)
}

export default LogIn