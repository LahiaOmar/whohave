import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import LoginContext from '../ContextAuth'

function ProtectedRoute({children , ...rest}){
  const context = React.useContext(LoginContext)
  console.log("children ", children, context)
  return (
    <Route 
      {...rest}
      render={({location})=>
        context.user.isLoged ? (
          children
        ) : (
          <Redirect 
            to={{
              pathname: '/'
            }}
          />
        )    
      }
    />
  )
}

export default ProtectedRoute