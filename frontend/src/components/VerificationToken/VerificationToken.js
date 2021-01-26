import React from 'react'
import LoginContext from '../ContextAuth'
import axios from 'axios'

function VerificationToken({ children }) {
  const [loading, setloading] = React.useState(true)
  const context = React.useContext(LoginContext)

  React.useEffect(() => {
    async function authToken() {
      try {
        const { data } = await axios.post('/api/user/verify')
        if (data.valideToken) {
          context.setContext({ ...context, isLoged: true })
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