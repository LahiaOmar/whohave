import React from 'react'
import { Typography, Link, Grid } from '@material-ui/core'

function Menu() {
	return (
		<Grid 
			item xs={8}>
			<div className="menu"> 
				<div className="menu-link"><Link href="#" underline="none" >Home</Link></div>
				<div className="menu-link"><Link href="#" underline="none" >Info</Link></div>
				<div className="menu-link"><Link href="#" underline="none" >Contact Us</Link></div>
			</div>
		</Grid>
	)
}

export default Menu