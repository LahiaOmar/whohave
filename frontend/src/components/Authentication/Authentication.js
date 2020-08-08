import React from 'react'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import MyModal from '../Mymodal'
import LoginContext from '../ContextAuth'
import StoreUser from '../StoreUser'
import WhoUser from '../WhoUser'
import {Grid} from '@material-ui/core'

function Authentication() {
	const context = React.useContext(LoginContext)
	const sm = context.isLoged ? 10 : 4
	
	return (
		<Grid item sm={sm} justify="flex-end" className="flex"> 
			{context.isLoged
					?(
						context.type
						?(
							<StoreUser />
						):(
							<WhoUser />
						)
					)
					:(
						<div className="auth-btn">
							<MyModal btnTitle="Sign Up">
									<SignUp />
							</MyModal>
							<MyModal btnTitle="Log In">
									<LogIn />
							</MyModal>
						</div >
					)
				}
		</Grid>
	)
}

export default Authentication