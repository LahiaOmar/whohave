import React from 'react'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import MyModal from '../Mymodal'
import LoginContext from '../ContextAuth'
import StoreUser from '../StoreUser'
import {Grid} from '@material-ui/core'

function Authentication() {
	
	const {isLoged, setIsLoged } = React.useContext(LoginContext)

	const submitSingUp = (data)=>{
		console.log("submit sign up data : ", data)
	}

	const submitLogIn = (data)=>{
		console.log("submition data from login component, data : ", data)
	}

	return (
		<Grid item xs={2} justify="flex-end">
			{isLoged
					?(
						<React.Fragment>
							<StoreUser />
						</React.Fragment>
					)
					:(
						<div className="auth-btn">
							<MyModal btnTitle="Sign Up">
									<SignUp submitSingUp={submitSingUp} />
							</MyModal>
							<MyModal btnTitle="Log In">
									<LogIn submitSingUp={submitLogIn}/>
							</MyModal>
						</div >
					)
				}
		</Grid>
	)
}

export default Authentication