import React from 'react'
import {Button, Grid, TextField, Typography, MenuItem,
	InputLabel, Select, Input, Checkbox, ListItemText, FormControl} from '@material-ui/core'
import {AccountCircle} from '@material-ui/icons'

function StoreInfo(props){
return (
		<div>
		<form className="form-signup">
			<Grid container justify="center" alignItems="center">
				<AccountCircle style={{fontSize:100, color:'blue'}}/>
				<Typography component="h1" variant="h5">
					Store info
				</Typography>
			</Grid>

			<Grid id container spacing={2}>
				<Grid item xs={12} sm={6} >
					<TextField
						
							name="firstName"
							variant="outlined"
							fullWidth
							label="First Name"
							size="small"
					/>
					</Grid>
					<Grid item xs={12} sm={6} >
						<TextField
								name="lastName"
								variant="outlined"
								fullWidth
								label="Last Name"
								size="small"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
								name="address"
								variant="outlined"
								fullWidth
								label="Address"
								size="small"
						/>
					</Grid>
					<Grid item xs={12}  >
						<TextField 
								size="small"
								name="email"
								variant="outlined"
								fullWidth
								label="email"
						/>
					</Grid>
					{/* <Grid item xs={12}>
						<FormControl className="multi-select-form">
							<InputLabel id="store-types">Store Types</InputLabel>
							<Select
								labelId="store-types"
								id="demo-mutiple-checkbox"
								multiple
								input={<Input />}
								renderValue={(selected) => selected.join(', ')}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={formik.values.storeType.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>	
						</FormControl>		
					</Grid> */}
					<Grid item xs={12}  >
						<TextField
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
							Save
					</Button>
				</Grid>
		</form> 
		</div>
	)
}

export default StoreInfo