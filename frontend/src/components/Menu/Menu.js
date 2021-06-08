import React from 'react'
import { Button, Grid, Hidden, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'
import { Route, Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	root: {
		display: ' flex',
		width: '200px',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column'
		},
		[theme.breakpoints.up('sm')]: {
			flexDirection: 'row'
		}
	},
	links: {
		width: '100%',
		height: '100%',
		padding: '10px',
		display: 'block',
		textAlign: 'center'
	},
	gridBasis: {
		flexBasis: 'auto'
	}
}))

function Menu() {

	const classes = useStyles()

	const desktopLists = [
		{ text: 'Home', to: '/' },
		{ text: 'Info', to: '#info' },
		{ text: 'Contact', to: '#contact' }
	]
	const mobileLists = [
		{ text: 'Home', to: '/', button: true },
		{ text: 'Info', to: '#info', button: true },
		{ text: 'Contact', to: '#contact', button: true }
	]

	const LinksList = ({ lists, ...restProps }) => (
		<List component="nav" className={classes.root}>
			{
				lists.map(item => (
					<ListItem className={classes.links} button={item.button} component={Link} underline="none" to={item.to} {...restProps} >
						<ListItemText primary={item.text} />
					</ListItem>
				))
			}
		</List>
	)

	return (
		<Route path="/" exact>
			<Grid className={classes.gridBasis} item xs={12} sm={5} >
				<Hidden xsDown>
					<LinksList lists={desktopLists} />
				</Hidden>
				<Hidden smUp>
					<LinksList lists={mobileLists} />
				</Hidden>
			</Grid>
		</Route>
	)
}

export default Menu