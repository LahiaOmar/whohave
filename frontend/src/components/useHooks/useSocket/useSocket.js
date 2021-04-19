import React from 'react'
import io from 'socket.io-client'
import { AuthContext } from '../../../Context/AuthProvider'

const useSocket = () => {
  console.log("context auth", React.useContext(AuthContext))
  const [loading, setLoading] = React.useState(true)
  const [notification, setNotification] = React.useState(null)
  const { authState: { profile } } = React.useContext(AuthContext)

  React.useEffect(() => {
    const options = {
      query: {
        userId: profile._id,
        userType: profile.userType
      }
    }
    const serverUrl = process.env.REACT_APP_PATH_SOCKET
    const client = io(serverUrl, options)
    console.log("socket user side ", client)
    client.on('connect', () => setLoading(false))
    client.on('notification', (data) => setNotification(data))

    return () => client.close()
  }, [])

  return [notification, loading]
}

export default useSocket