import React from 'react'
import {Grid} from '@material-ui/core'
import UserNavBar from '../UserNavBar'
import StoresInfo from '../StoresInfo'
import Map from '../Map'
import LoginContext from '../ContextAuth'
import { Redirect } from 'react-router-dom'

function Dashboard(){
	const {isLoged} = React.useContext(LoginContext)
	return (isLoged
				?(
					<div id="dashboard">
						<Grid container spacing={0}>
							<Grid item xs={2} >
								<div>Store notificaions</div>
							</Grid>
							<Grid item xs={10}> 
								<Map/>
							</Grid>
						</Grid>            
					</div>
				)
				:
				( 
					<Redirect to="/"/>
				)
			)
}

export default Dashboard