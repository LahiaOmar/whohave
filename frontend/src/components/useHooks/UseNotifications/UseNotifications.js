import React from 'react'
import LoginContext from '../../ContextAuth'
import Axios from 'axios'

const useNotifications = () => {
  const [loading, setLoading] = React.useState(true)
  const [data, setData] = React.useState({})
  const { userData: { _id }, userType } = React.useContext(LoginContext)

  const fetchUserData = async () => {
    setLoading(true)
    const config = {
      method: 'POST',
      url: '/api/notifications/get',
      data: {
        userType: userType,
        userId: _id
      }
    }
    const { data } = await Axios(config)
    setData(data)
    setLoading(false)
  }

  React.useEffect(() => {
    fetchUserData()
  }, [])

  return [data, loading, fetchUserData]
}

export default useNotifications