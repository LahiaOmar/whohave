import React from 'react'
import io from 'socket.io-client'
import { AppBar, Button, Grid, Toolbar } from '@material-ui/core'
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
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

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

	if (loading)
		return <div>Loading ...</div>
	return (
		<Grid className="dashboard-container" item xs={12} spacing={4}>
			<Grid className="dashboard-topbar" xs={12} item>
				<AppBar position="relative">
					<Toolbar disableGutters>
						<Button>
							<DehazeIcon />
						</Button>
						<Button>
							<ExitToAppIcon />
						</Button>
						<Button>
							<NotificationsIcon />
						</Button>
					</Toolbar>
				</AppBar>
			</Grid>
			<Grid xs={12} container item>
				<Grid item className="dashboard-menu" xs={2}>
					<Link className="menu-btn" to="/dashboard/notifications">
						<ListAltIcon />
						Notifications
					</Link>
					<Link className="menu-btn" to="/dashboard/profile">
						<AccountBoxIcon />
							Profile
					</Link>
				</Grid>
				<Grid item xs={10} className="dashboard-notifications">

					<Route path="/dashboard/notifications">
						{context.type
							? <ListOfProduct notifications={notifications} dispatch={dispatch} />
							: <ListOfResponse notifications={notifications} dispatch={dispatch} />
						}
					</Route>
					<Route path="/dashboard/profile">
						<UserInformationPanel />
					</Route>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Dashboard