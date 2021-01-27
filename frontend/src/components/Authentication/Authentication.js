import React from 'react'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import MyModal from '../Mymodal'
import LoginContext from '../ContextAuth'
import { Button, Grid, Menu, MenuItem, Avatar } from '@material-ui/core'
import { useAxios } from '../useHooks'

function Authentication() {
	const context = React.useContext(LoginContext)
	const [data, error, loading, setConfig] = useAxios({})
	const [modalState, setModalState] = React.useState({
		signUpOpen: false,
		loginOpen: false
	})
	const clModelsEvent = (target) => setModalState({ ...modalState, [target.who]: target.bool })
	const closeModal = () => setModalState({ signUpOpen: false, loginOpen: false })
	React.useEffect(() => {
		if (data && !error) {
			closeModal()
			localStorage.userType = data.type
			context.setContext({
				...context,
				isLoged: true,
				type: data.type,
				userData: data.information,
				redirect: 'dashboard/notifications'
			})
			context.redirectTo('/dashboard/notifications')
		}
	}, [data])

	const clSubmit = (config) => {
		setConfig(config)
	}

	const sm = context.isLoged ? 10 : 4
	const [openMenu, setOpenMenu] = React.useState(null)

	const buttonOnClick = (event) => {
		setOpenMenu(event.currentTarget)
	}

	const handleCloseMenu = () => {
		setOpenMenu(null)
	}
	return (
		<Grid item sm={sm} justify="flex-end" className="flex">
			{context.isLoged
				?
				<div>
					<Button
						aria-controls="simple-menu"
						aria-haspopup="true"
						endIcon={<Avatar> {`${context.userData.firstName[0]}.${context.userData.lastName[0]}`} </Avatar>}
						onClick={buttonOnClick}>
						{`${context.userData.firstName} ${context.userData.lastName}`}
					</Button>
					<Menu
						id="simple-menu"
						anchorEl={openMenu}
						open={Boolean(openMenu)}
						keepMounted
						onClose={handleCloseMenu}
					>
						<MenuItem onClick={() => context.redirectTo('/dashboard/notifications')}>
							dashboard
						</MenuItem>
						<MenuItem onClick={() => context.logout()}>
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
							<SignUp error={error} loading={loading} clSubmit={clSubmit} />
						</MyModal>
						<MyModal
							useBtn
							btnTitle="Log In"
							open={modalState.loginOpen}
							handleClose={() => clModelsEvent({ bool: false, who: 'loginOpen' })}
							handleOpen={() => clModelsEvent({ bool: true, who: 'loginOpen' })}
						>
							<LogIn error={error} loading={loading} clSubmit={clSubmit} />
						</MyModal>
					</div >
				)
			}
		</Grid>
	)
}

export default Authentication