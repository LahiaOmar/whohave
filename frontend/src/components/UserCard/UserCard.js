import React from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import Axios from 'axios'
import { Avatar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import './style.css'

const UserCard = () => {
  const { authState: { profile } } = React.useContext(AuthContext)

  const getFirstName = () => {
    return profile.firstName
  }
  const getLastName = () => {
    return profile.lastName
  }

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