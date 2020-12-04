import React from 'react'
import io from 'socket.io-client'
import {
	AppBar,
	Button,
	Divider,
	Grid,
	Toolbar,
	Link as LinkUi,
	Badge,
} from '@material-ui/core'
import LoginContext from '../ContextAuth'
import ListOfProduct from '../ListOfProduct'
import ListOfResponse from '../ListOfResponse'
import UserInformationPanel from '../UserInformationPanel'
import Axios from 'axios'
import constants from '../../constants'
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

const Dashboard = () => {
	const context = React.useContext(LoginContext)
	const [notifications, dispatch, loading] = useNotifications();

	React.useEffect(() => {
		document.title = "Dashboard"
	}, [])

	if (loading)
		return <div>Loading ...</div>
	return (
		<Grid className="dashboard-container" item xs={12} spacing={4}>
			<Grid xs={12} item>
				<AppBar position="relative">
					<Toolbar className="dashboard-topbar" disableGutters>
						<Button color="inherit">
							<DehazeIcon />
						</Button>
						<Badge badgeContent={10} color="secondary">
							<NotificationsIcon />
						</Badge>
						<Button color="inherit">
							<ExitToAppIcon />
						</Button>
					</Toolbar>
				</AppBar>
			</Grid>
			<Grid className="dashboard-mid" xs={12} container item>
				<Grid item className="dashboard-menu" xs={2}>
					<WhoUser />
					<Divider />
					{
						context.type
							? <StoreMenuList />
							: <UserMenuList />
					}
				</Grid>
				<Grid item xs={10} className="dashboard-notifications">
					<Route exact path="/dashboard/notifications">
						{context.type
							? <ListOfProduct notifications={notifications} dispatch={dispatch} />
							: <ListOfResponse notifications={notifications} dispatch={dispatch} />
						}
					</Route>
					<Route exact path="/dashboard/profile">
						<UserInformationPanel />
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