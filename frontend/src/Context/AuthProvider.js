import React from 'react'
import authReducer, { authInitialState } from './reducers/AuthReducer'
import * as AUTH_ACTIONS from './actions/AuthTypes'
import Axios from 'axios'

const AuthContext = React.createContext(authInitialState)

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = React.useReducer(
    authReducer,
    authInitialState
  )

  React.useEffect(() => {
    const authToken = () => {
      Axios.post('/api/user/verify')
        .then(({ data }) => {
          console.log("data then ", data)
          authDispatch(AUTH_ACTIONS.tokenVerification(true, { userType: data.userType, ...data.userData }))
        })
        .catch(err => {
          console.log("err token vald", err)
          authDispatch(AUTH_ACTIONS.tokenVerification(false, {}))
        })
    }
    authToken()
  }, [authState.validationToken.status])

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {
        authState.validationToken.status === AUTH_ACTIONS.TOKEN_CHECKING
          ? ("token verification")
          : authState.validationToken.status === AUTH_ACTIONS.TOKEN_DONE
            ? (children)
            : null
      }
    </AuthContext.Provider>
  )
}

export { AuthContext }
export default AuthProvider