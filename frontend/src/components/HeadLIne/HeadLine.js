import React from 'react'
import {Grid} from '@material-ui/core'

function HeadLine(){
	return(
		<Grid container xs={12}>
			<Grid item xs={6}>
				<p>whohave</p>
				<p>Store Owner : </p>
				<ul>
					<li>Locate You Store</li>
					<li>Wait For Client Request</li>
					<li>dump-up OR dump-down</li>
					<li>More client ;)</li>
				</ul>
				<p>Search a product : </p>
				<ul>
					<li>Select type of your product</li>
					<li>add some others information : (description, image ... )</li>
					<li>bessa7a bro ;)</li>
				</ul>
			</Grid>
			<Grid item xs={6}>
				<p>biglo </p>
			</Grid>
		</Grid>
	)
}

export default HeadLine