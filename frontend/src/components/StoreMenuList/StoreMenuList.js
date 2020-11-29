import React from 'react'
import { Link } from 'react-router-dom'
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';


const UserMenuList = () => {
  return (
    <div className="menu-list">
      <Link className="menu-btn" to="/dashboard/notifications">
        <ListAltIcon />
        Notifications
      </Link>
      <Link className="menu-btn" to="/dashboard/profile">
        <AccountBoxIcon />
        Profile
      </Link>
    </div>
  )
}

export default UserMenuList