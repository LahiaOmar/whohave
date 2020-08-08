import React from 'react'
import UserMenu from '../UserMenu'
import LoginContext from '../ContextAuth'

function WhoUser(props){
  const context = React.useContext(LoginContext)
  const {firstName, lastName} = context.userData
  return (
    <div id="who-user">
      <UserMenu/>
    </div>
  )
}

export default WhoUser