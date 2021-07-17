import React from 'react'
import { Grid, makeStyles, Container, Hidden, IconButton, Drawer, Divider } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

import Menu from '../Menu'
import Authentication from '../Authentication'
import Logo from '../Logo'


const useStyles = makeStyles((theme) => ({
	root: {
		boxShadow: theme.shadows[3]
	},
	navContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '68px',
	},
	drawer: {
		width: '200px',
	},
	btnDrawer: {
		position: 'absolute',
		zIndex: theme.zIndex.drawer + 10
	}
}))

function NavBar() {
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const classes = useStyles()
	const handlerDrawerToggle = () => setMobileOpen(open => !open)

	return (
		<Grid
			container
			className={classes.root}>
			<Container maxWidth="lg" >
				<Grid container className={classes.navContainer} xs={12} sm={12} >
					<Hidden smUp >
						<Grid className={classes.btnDrawer} item xs={2} alignItems="center">
							<IconButton onClick={handlerDrawerToggle}>
								<MenuIcon />
							</IconButton>
						</Grid>
						<Drawer className={classes.drawer} anchor="left" variant="temporary" open={mobileOpen} onClose={handlerDrawerToggle}>
							<Divider />
							<Menu />
							<Divider />
							<Authentication />
						</Drawer>
					</Hidden>
					<Logo />
					<Hidden xsDown >
						<Menu />
						<Authentication />
					</Hidden>
				</Grid>
			</Container>
		</Grid>
	)
}

export default NavBar