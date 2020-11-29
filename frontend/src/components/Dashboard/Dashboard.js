import React from 'react'
import io from 'socket.io-client'
import {
	AppBar,
	Button,
	Divider,
	Grid,
	Toolbar,
	Link as LinkUi,
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

function useNotifications() {
	const { userData, type } = React.useContext(LoginContext)
	const [loading, setLoading] = React.useState(true)
	const [state, dispatch] = React.useReducer((state, action) => {
		let newState = [...state]
		switch (action.type) {
			case 'CHECK_BYID':
				newState = newState.map(element => {
					if (element._id === action.id) {
						element.isSelected = !element.isSelected
					}
					return element
				})
				break;
			case 'CHECK_ALL':
				newState = newState.map(element => {
					element.isSelected = action.isSelected
					return element
				})
				break;
			case 'DELETE':
				newState = newState.filter((element => !action.idsArr.includes(element._id)))
				break;
			case 'ADD':
				newState.push(action.newNotification)
				break;
			case 'UPDATE':
				newState = action.newNotifications
				break;
			default:
				console.log("error action type")
		}
		return newState
	}, [])


	const isConnectedHandler = async () => {
		const config = {
			method: 'POST',
			url: 'http://localhost:4000/api/notifications/get',
			data: {
				type: type,
				userId: userData._id
			}
		}
		const { data } = await Axios(config)
		setLoading(false);
		const newNotifications = data.notifications.map(e => {
			e.isSelected = false
			return e
		})
		dispatch({ type: 'UPDATE', newNotifications })
	}

	const addNotification = (data) => {
		console.log("new notification ", data)
		const newNotification = JSON.parse(data)
		newNotification.isSelected = false
		dispatch({ type: 'ADD', newNotification })
	}

	React.useEffect(() => {
		const options = {
			query: {
				userId: userData._id,
				type: type
			}
		}
		const pathSocket = process.env.REACT_APP_PATH_SOCKET
		const socket = io(pathSocket, options)
		socket.on('connect', () => isConnectedHandler())
		socket.on('newNotification', addNotification)

		return () => {
			socket.close()
		}
	}, [])

	return [state, dispatch, loading]
}

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
						<Button>
							<DehazeIcon />
						</Button>
						<Button>
							<NotificationsIcon />
						</Button>
						<Button>
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