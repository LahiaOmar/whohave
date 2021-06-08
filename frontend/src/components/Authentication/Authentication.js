import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import useAxios from '../useHooks/useAxios'
import { AuthContext } from '../../Context/AuthProvider'
import { AlertContext } from '../../Context/AlertProvider'
import * as AUTH_TYPES from '../../Context/actions/AuthTypes'
import * as ALERT_TYPES from '../../Context/actions/AlertTypes'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import UserLogged from '../UserLogged'
import UserNotLogged from '../UserNotLogged'

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up('xs')]: {

		},
		[theme.breakpoints.down('xs')]: {

		}
	}
}))

function Authentication() {
	const { authState: { loged }, authDispatch } = React.useContext(AuthContext)
	const { alertDispatch } = React.useContext(AlertContext)
	const [data, error, loading, setConfig] = useAxios({})
	const [modalState, setModalState] = React.useState({
		signUpOpen: false,
		loginOpen: false
	})
	let history = useHistory()

	const setModalHandler = (target) => setModalState({ ...modalState, [target.who]: target.bool })
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

	return (
		<Grid item sm={5} xs={12} >
			{loged ?
				<UserLogged /> :
				<UserNotLogged modalState={modalState} setModalHandler={setModalHandler} error={error} clSubmit={clSubmit} />
			}
		</Grid>
	)
}

export default Authentication