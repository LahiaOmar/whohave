import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import {Route, Link} from 'react-router-dom'

function Menu() {
	return (
		<Route path="/" exact>
			<Grid 
				item sm={6}>
				<div className="menu"> 
					<div className="menu-link"><Link to="/" color="inherit" underline="none" >Home</Link></div>
					<div className="menu-link"><Link to="#info" color="inherit" underline="none" >Info</Link></div>
					<div className="menu-link"><Link to="#contact" color="inherit" underline="none" >Contact Us</Link></div>
				</div>
			</Grid>
		</Route>
	)
}

export default Menu