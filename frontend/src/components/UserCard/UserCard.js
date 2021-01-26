import React from 'react'
import LoginContext from '../ContextAuth'
import Axios from 'axios'

const UserCard = () => {
  const context = React.useContext(LoginContext)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchUserData() {
      if (Object.keys(context.userData).length === 0) {
        const { data } = await Axios.post('/api/user/getInformation')
        console.log("data ", data)
        context.setContext({ ...context, userData: data.userData })
        setLoading(false)
      }
      else {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])

  if (loading)
    return <div>Loading user card...</div>
  return (
    <div>
      user card
      {
        context.userData.firstName
      }
    </div>
  )

}

export default UserCard