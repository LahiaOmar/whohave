import React from 'react'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import MyModal from '../Mymodal'
import LoginContext from '../ContextAuth'
import StoreUser from '../StoreUser'
import WhoUser from '../WhoUser'
import { Grid } from '@material-ui/core'
import { useAxios } from '../useHooks'
import { useHistory } from 'react-router-dom'
import UserCard from '../UserCard'

function Authentication() {
	const context = React.useContext(LoginContext)
	const [data, error, loading, setConfig] = useAxios({})
	const [modalState, setModalState] = React.useState({
		signUpOpen: false,
		loginOpen: false
	})

	const clModelsEvent = (target) => setModalState({ ...modalState, [target.who]: target.bool })
	const closeModal = () => setModalState({ signUpOpen: false, loginOpen: false })
	const history = useHistory()
	React.useEffect(() => {
		if (data && !error) {
			closeModal()
			localStorage.userType = data.type
			context.setContext({
				isLoged: true,
				type: data.type,
				userData: data.information,
				redirect: 'dashboard/notifications'
			})
		}
	}, [data])

	React.useEffect(() => {
		if (context.isLoged) {
			history.push(context.redirect)
		}
	}, [context.isLoged])

	const clSubmit = (config) => {
		setConfig(config)
	}

	const sm = context.isLoged ? 10 : 4

	return (
		<Grid item sm={sm} justify="flex-end" className="flex">
			{context.isLoged
				? (
					<UserCard />
				)
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