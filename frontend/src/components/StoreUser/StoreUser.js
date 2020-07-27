import React from 'react'
import { Avatar } from '@material-ui/core'
import MyModal from '../Mymodal'
import StoresInfo from '../StoresInfo'
import UserMenu from '../UserMenu'

function StoreUser(props){
  return (
    <React.Fragment> 
      <UserMenu firstName="omar" lastName="lahia" />
      {/* <isOpen /> 
        have switch button : to notify others user if he is open or not 
        display also the opening time of the sotre.
      */}
    </React.Fragment>
  )
}

export default StoreUser

