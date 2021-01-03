import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import LoginContext from '../ContextAuth'

function ProtectedRoute({ children, to, ...rest }) {
  const context = React.useContext(LoginContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        context.isLoged ? (
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