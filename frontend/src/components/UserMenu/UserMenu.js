import React from 'react'
import { Button, Avatar, Menu, MenuItem, Typography } from '@material-ui/core'

function UserMenu({lastName, firstName}){
  const [anchorEl, setAnhcorEl] = React.useState(null)

  const handleClick = (e)=>{
    setAnhcorEl(e.currentTarget)
  }

  const handleClose = ()=>{
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
        <MenuItem onClick={handleClose}>my information</MenuItem>
        <MenuItem onClick={handleClose}>logout</MenuItem>
      </Menu>
    </div>
  )
}

export default UserMenu