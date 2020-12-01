import React from 'react'
import { Link } from 'react-router-dom'
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';


const UserMenuList = () => {
  return (
    <div className="menu-list">
      <List component="nav">
        <ListItem button component={Link} to="/dashboard/notifications">
          <ListItemIcon>
            <ListAltIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications" />
        </ListItem>

        <ListItem button component={Link} to="/dashboard/profile">
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
      </List>
    </div>
  )
}

export default UserMenuList