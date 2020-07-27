import React from 'react'
import { Button, Avatar, Menu, MenuItem, Typography } from '@material-ui/core'
import {Link} from 'react-router-dom'
import ContextAuth from '../ContextAuth'

function UserMenu({lastName, firstName}){
  const [anchorEl, setAnhcorEl] = React.useState(null)
  const context = React.useContext(ContextAuth)

  const handleClick = (e)=>{
    setAnhcorEl(e.currentTarget)
  }

  const handleClose = ()=>{
    setAnhcorEl(null)
  }

  const handleLogOut = ()=>{
    context.setUser({isLoged : false, redirect : {ok  : true, to : "/"}})
    setAnhcorEl(null)
  }
  return (
    <div id="user-menu">
      <Button aria-controls="panel-menu" onClick={handleClick}>
        <Avatar>
          {
            `${lastName[0]}.${firstName[0]}`
          }
        </Avatar>
        <Typography>
          {`${lastName} ${firstName}`}
        </Typography>
      </Button>
      <Menu
        id="panel-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={()=> setAnhcorEl()}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/dashboard/information"> My information </Link>
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          LogOut
        </MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu