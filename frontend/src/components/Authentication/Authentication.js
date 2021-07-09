import React from 'react'
import { Grid } from '@material-ui/core'

import { AuthContext } from '../../Context/AuthProvider'
import UserLogged from '../UserLogged'
import UserNotLogged from '../UserNotLogged'

function Authentication() {
	const { authState: { loged } } = React.useContext(AuthContext)
	const [modalState, setModalState] = React.useState({
		signUpOpen: false,
		loginOpen: false
	})
	const setModalHandler = (target) => setModalState({ ...modalState, [target.who]: target.bool })
	const closeModal = () => setModalState({ signUpOpen: false, loginOpen: false })

	return (
		<Grid item sm={5} xs={12} >
			{loged ?
				<UserLogged /> :
				<UserNotLogged modalState={modalState} setModalHandler={setModalHandler} />
			}
		</Grid>
	)
}

export default Authentication