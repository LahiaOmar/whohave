import React from 'react'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import MyModal from '../Mymodal'
import { Button, Grid, Menu, MenuItem, Avatar } from '@material-ui/core'
import useAxios from '../useHooks/useAxios'
import { AuthContext } from '../../Context/AuthProvider'
import { AlertContext } from '../../Context/AlertProvider'
import * as AUTH_TYPES from '../../Context/actions/AuthTypes'
import * as ALERT_TYPES from '../../Context/actions/AlertTypes'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

function Authentication() {
	const { authState: { profile, loged }, authDispatch } = React.useContext(AuthContext)
	const { alertDispatch } = React.useContext(AlertContext)
	const [data, error, loading, setConfig] = useAxios({})
	const [modalState, setModalState] = React.useState({
		signUpOpen: false,
		loginOpen: false
	})
	let history = useHistory()

	const clModelsEvent = (target) => setModalState({ ...modalState, [target.who]: target.bool })
	const closeModal = () => setModalState({ signUpOpen: false, loginOpen: false })

	const clSubmit = async (config) => {
		try {
			const { data } = await Axios(config)
			authDispatch(AUTH_TYPES.login({ userType: data.userType, ...data.information }))
			alertDispatch(ALERT_TYPES.loginSuccess())
			history.push('/dashboard/notifications')
		}
		catch (ex) {
			console.log("ex login ", ex)
			alertDispatch(ALERT_TYPES.loginFailure())
		}
	}

	const sm = loged ? 10 : 4
	const [openMenu, setOpenMenu] = React.useState(null)

	const buttonOnClick = (event) => {
		setOpenMenu(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setOpenMenu(null)
	}
	return (
		<Grid item sm={sm} justify="flex-end" className="flex">
			{loged
				?
				<div>
					<Button
						aria-controls="simple-menu"
						aria-haspopup="true"
						endIcon={<Avatar> {`${profile.firstName[0]}.${profile.lastName[0]}`} </Avatar>}
						onClick={buttonOnClick}>
						{`${profile.firstName} ${profile.lastName}`}
					</Button>
					<Menu
						id="simple-menu"
						anchorEl={openMenu}
						open={Boolean(openMenu)}
						keepMounted
						onClose={handleCloseMenu}
					>
						<MenuItem onClick={() => console.log("redirect ")}>
							dashboard
						</MenuItem>
						<MenuItem onClick={() => console.log("logout")}>
							logout
						</MenuItem>
					</Menu>
				</div>
				: (
					<div className="auth-btn">
						<MyModal
							useBtn
							btnTitle="Sign Up"
							open={modalState.signUpOpen}
							handleClose={() => clModelsEvent({ bool: false, who: 'signUpOpen' })}
							handleOpen={() => clModelsEvent({ bool: true, who: 'signUpOpen' })}
						>
							<SignUp error={error} clSubmit={clSubmit} />
						</MyModal>
						<MyModal
							useBtn
							btnTitle="Log In"
							open={modalState.loginOpen}
							handleClose={() => clModelsEvent({ bool: false, who: 'loginOpen' })}
							handleOpen={() => clModelsEvent({ bool: true, who: 'loginOpen' })}
						>
							<LogIn error={error} clSubmit={clSubmit} />
						</MyModal>
					</div >
				)
			}
		</Grid>
	)
}

export default Authentication