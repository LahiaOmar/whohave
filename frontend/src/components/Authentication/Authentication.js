import React from 'react'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import MyModal from '../Mymodal'
import LoginContext from '../ContextAuth'
import StoreUser from '../StoreUser'

function Authentication() {
	
	const {isLoged, setIsLoged } = React.useContext(LoginContext)

	const submitSingUp = (data)=>{
		console.log("submit sign up data : ", data)
	}

	const submitLogIn = (data)=>{
		console.log("submition data from login component, data : ", data)
	}

	return (
		<div>
				{isLoged
					?(
						<React.Fragment>
							<StoreUser />
						</React.Fragment>
					)
					:(
						<React.Fragment>
							<MyModal btnTitle="Sign Up">
									<SignUp submitSingUp={submitSingUp} />
							</MyModal>
							<MyModal btnTitle="Log In">
									<LogIn submitSingUp={submitLogIn}/>
							</MyModal>
						</React.Fragment>
					)
				}
		</div>
	)
}

export default Authentication