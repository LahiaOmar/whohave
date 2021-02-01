import React from 'react'
import {
	AppBar,
	Button,
	Divider,
	Grid,
	Toolbar,
	Link as LinkUi,
	Badge,
	Tooltip,
} from '@material-ui/core'
import LoginContext from '../ContextAuth'
import ListOfProduct from '../ListOfProduct'
import ListOfResponse from '../ListOfResponse'
import UserInformations from '../UserInformations'
import StoreInformations from '../StoreInformations'
import UserCard from '../UserCard'
import { Route, Link } from 'react-router-dom'
import './style.css'
import DehazeIcon from '@material-ui/icons/Dehaze';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';

import WhoUser from '../WhoUser'
import UserMenuList from '../UserMenuList'
import StoreMenuList from '../StoreMenuList'
import Message from '../Message'

import useNotifications from '../useHooks/UseNotifications'
import Axios from 'axios'

const Dashboard = () => {
	const context = React.useContext(LoginContext)
	const [notifications, dispatch, loading] = useNotifications();
	const [actionErrors, setActionErrors] = React.useState({
		msg: ''
	})
	React.useEffect(() => {
		document.title = "Dashboard"
	}, [])

	if (loading)
		return <div>Loading Dashboard...</div>
	return (
		<Grid className="dashboard-container" item xs={12} spacing={4}>
			<Grid xs={12} item>
				<AppBar position="relative">
					<Toolbar className="dashboard-topbar" disableGutters>
						{/* <Button color="inherit">
							<DehazeIcon />
						</Button>
						<Badge badgeContent={10} color="secondary">
							<NotificationsIcon />
						</Badge> */}
						<Tooltip title="LogOut" onClick={() => context.logout()}>
							<Button color="inherit">
								<ExitToAppIcon />
							</Button>
						</Tooltip>
					</Toolbar>
				</AppBar>
			</Grid>
			<Grid className="dashboard-mid" xs={12} container item>
				<Grid item className="dashboard-menu" xs={2}>
					<UserCard />
					<Divider />
					{
						context.userType
							? <StoreMenuList />
							: <UserMenuList />
					}
				</Grid>
				<Grid item xs={10} className="dashboard-notifications">
					<div>
						erros div :
						{
							actionErrors.msg
						}
					</div>
					<Route exact path="/dashboard/notifications">
						{context.userType
							? <ListOfProduct notifications={notifications} dispatch={dispatch} setActionErrors={setActionErrors} />
							: <ListOfResponse notifications={notifications} dispatch={dispatch} setActionErrors={setActionErrors} />
						}
					</Route>
					<Route exact path="/dashboard/profile">
						{
							context.userType
								? <StoreInformations />
								: <UserInformations />
						}
					</Route>
					<Route exact path="/dashboard/product">
						<Message />
					</Route>
				</Grid>
			</Grid>
		</Grid >
	)
}

export default Dashboard