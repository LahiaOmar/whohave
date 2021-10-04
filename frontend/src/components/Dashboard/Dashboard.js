import React from 'react'
import { Grid } from '@material-ui/core'
import { AuthContext } from '../../Context/AuthProvider'
import UserDashboard from '../UserDashboard'
import StoreDashboard from '../StoreDashboard'
import ErrorBoundary from '../ErrorBoundary'

import './style.css'

const Dashboard = () => {
	const { authState: { profile } } = React.useContext(AuthContext)

	return (
		<ErrorBoundary>
			<Grid className="dashboard-container" item xs={12} spacing={4}>
				{
					profile.userType === "STORE"
						? <StoreDashboard />
						: <UserDashboard />
				}
			</Grid >
		</ErrorBoundary>
	)
}

export default Dashboard