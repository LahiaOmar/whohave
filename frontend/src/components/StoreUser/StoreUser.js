import React from 'react'
import { Avatar } from '@material-ui/core'
import MyModal from '../Mymodal'
import StoresInfo from '../StoresInfo'

function StoreUser(props){
  return (
    <div id="store-user" style={{display:'flex'}}> 
      <Avatar >L.O</Avatar>
      <div id="store-avatar">
        <p>Lahia Omar</p>
      </div>
      <div id="store-information">
        <MyModal btnTitle="more information">
         <StoresInfo />
        </MyModal>
      </div>
    </div>
  )
}

export default StoreUser
