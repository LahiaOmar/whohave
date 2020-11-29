import React from 'react'
import { Button, Avatar, Menu, MenuItem, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import ContextAuth from '../ContextAuth'

function UserMenu() {
  const context = React.useContext(ContextAuth)
  const { lastName, firstName } = context.userData
  return (
    <div id="user-menu">
      <Avatar style={{ width: "60px", height: "60px" }}>
        {
          `${lastName[0]}.${firstName[0]}`
        }
      </Avatar>
      <Typography>
        <h2>{`${lastName} ${firstName}`}</h2>
      </Typography>
    </div>
  )
}

export default UserMenu