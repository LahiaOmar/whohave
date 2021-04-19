import React from 'react'
import { Grid } from '@material-ui/core'
import { AuthContext } from '../../Context/AuthProvider'
import UserDashboard from '../UserDashboard'
import StoreDashboard from '../StoreDashboard'
import './style.css'

const Dashboard = () => {
	const { authState: { profile } } = React.useContext(AuthContext)

	return (
		<Grid className="dashboard-container" item xs={12}>
			{
				profile.userType === "STORE"
					? <StoreDashboard />
					: <UserDashboard />
			}
		</Grid >
	)
}

export default Dashboard