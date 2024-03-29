import React from 'react'
import { Tabs, Tab, Grid, makeStyles } from '@material-ui/core'
import SignUpStore from '../SignUpStore'
import SignUpUser from '../SignUpUser'

const useStyles = makeStyles((theme) => ({
	root: {
		width: 'calc(80vw)',
		maxWidth: '1100px',
		backgroundColor: 'white',
		borderRadius: '4px',
		padding: '16px',
		maxHeight: 'calc(100vh)'
	}
}))

const TabPanel = ({ children, value, index, ...other }) => {
	if (value !== index)
		return <></>

	return (
		<div
			className="tab-panel"
			role="tabpanel"
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{children}
		</div>
	)
}

function SignUp() {
	const classes = useStyles()
	const [value, setValue] = React.useState(0)
	const signUpCompoNames = ["Store Owner", "User"]

	return (
		<Grid container className={classes.root} justify="center">
			<Grid item xs={12}>
				<Tabs value={value} onChange={(e, v) => setValue(v)} aria-label="simple tabs" centered>
					<Tab label={signUpCompoNames[0]} id="simple-tab-0" aria-controls="simple-tabpanel-0" />
					<Tab label={signUpCompoNames[1]} id="simple-tab-1" aria-controls="simple-tabpanel-1" />
				</Tabs>
			</Grid>
			<Grid container item xs={12} spacing={2} >
				<Grid item xs={12}>
					<TabPanel value={value} index={0}>
						<SignUpStore />
					</TabPanel>
				</Grid>
				<Grid item xs={12}>
					<TabPanel value={value} index={1} >
						<SignUpUser />
					</TabPanel>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default SignUp