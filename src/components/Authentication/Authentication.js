import React from 'react'
import LogIn from '../LogIn'
import SignUp from '../SignUp'
import MyModal from '../Mymodal'

function Authentication() {
    return (
        <div>
            {true
            ?<React.Fragment>
                <MyModal btnTitle="Sign UP">
                    <SignUp />
                </MyModal>
                <MyModal btnTitle="Log IN">
                    <LogIn />
                </MyModal>
            </ React.Fragment>
            :<div>user information</div>
        }
        </div>
    )
}

export default Authentication