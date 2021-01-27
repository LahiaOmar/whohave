import React from 'react'
import LoginContext from '../ContextAuth'
import Axios from 'axios'
import { Avatar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import './style.css'

const UserCard = () => {
  const context = React.useContext(LoginContext)
  const [loading, setLoading] = React.useState(true)

  const getFirstName = () => {
    return context.userData.firstName
  }
  const getLastName = () => {
    return context.userData.lastName
  }

  React.useEffect(() => {
    async function fetchUserData() {
      try {
        if (Object.keys(context.userData).length === 0) {
          const { data } = await Axios.post('/api/user/getInformation')
          context.setContext({ ...context, userData: data.userData })
          setLoading(false)
        }
        else {
          setLoading(false)
        }
      }
      catch (e) {
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])

  if (loading)
    return <div>Loading user card...</div>
  return (
    <div id="user-menu">
      <Avatar id="avatar">
        {
          `${getFirstName()[0]}.
          ${getLastName()[0]}`
        }
      </Avatar>
      <Typography align="center">
        <h2> {`${getFirstName()}`} {`${getLastName()}`} </h2>
      </Typography>
    </div>
  )

}

export default UserCard