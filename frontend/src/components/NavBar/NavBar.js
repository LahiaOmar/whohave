import React from 'react'

import Menu from '../Menu'
import Authentication from '../Authentication'
import Logo from '../Logo'

import {AppBar, Grid, Container} from '@material-ui/core'

function NavBar(){
	return(
		<Grid container xs={12} className="nav-bar">
				<Container maxWidth="lg" style={{display:'flex'}}>
					<Logo />
					<Menu />
					<Authentication />
				</Container>
		</Grid>
	)
}

export default NavBar