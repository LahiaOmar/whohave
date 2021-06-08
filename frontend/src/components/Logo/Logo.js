import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		alignContent: 'space-between',
		[theme.breakpoints.up('xs')]: {
			justifyContent: 'flex-start',
		},
		[theme.breakpoints.down('xs')]: {
			justifyContent: 'center',
		}
	}
}))

function Logo() {
	const classes = useStyles()

	return (
		<Grid item xs={12} sm={2} className={classes.root}>
			<Typography>
				WhoHave?
      </Typography>
		</Grid>
	)
}

export default Logo