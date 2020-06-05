import React from 'react'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import MyModal from '../Mymodal'

function Authentication() {
    
    const submitSingUp = (data)=>{
        console.log("submit sign up data : ", data)
    }

    const submitLogIn = (data)=>{
        console.log("submition data from login component, data : ", data)
    }

    return (
        <div>
            {true
            ?<React.Fragment>
                <MyModal btnTitle="Sign UP">
                    <SignUp submitSingUp={submitSingUp} />
                </MyModal>
                <MyModal btnTitle="Log IN">
                    <LogIn submitSingUp={submitLogIn}/>
                </MyModal>
            </ React.Fragment>
            :<div>user information</div>
        }
        </div>
    )
}

export default Authentication