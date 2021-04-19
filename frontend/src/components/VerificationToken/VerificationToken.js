import React from 'react'
import LoginContext from '../ContextAuth'
import { AuthContext } from '../../Context/AuthProvider'
import * as AUTH_ACTIONS from '../../Context/actions/AuthTypes'
import axios from 'axios'

function VerificationToken({ children }) {
  const { authDispatch } = React.useContext(AuthContext)
  const [loading, setloading] = React.useState(true)
  const context = React.useContext(LoginContext)

  React.useEffect(() => {
    async function authToken() {
      try {
        const { data } = await axios.post('/api/user/verify')
        console.log("data verify ", data)
        if (data.valideToken) {
          context.setContext({ ...context, isLoged: true, userData: data.userData, userType: data.userType })
          authDispatch(AUTH_ACTIONS.login({ userType: data.userType, ...data.userData }))
          setloading(false)
        }
        else {
          setloading(false)
        }
      }
      catch (e) {
        setloading(false)
      }
    }
    authToken()
  }, [])

  if (loading)
    return <p>token verification</p>

  return children
}

export default VerificationToken