import React from 'react'
import UserMenu from '../UserMenu'
import LoginContext from '../ContextAuth'

function WhoUser(props){
  const context = React.useContext(LoginContext)
  const {firstName, lastName} = context.user.userData
  return (
    <div id="who-user">
      <UserMenu firstName={firstName} lastName={lastName} />
    </div>
  )
}

export default WhoUser