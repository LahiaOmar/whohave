import React from 'react'
import { Route, Redirect, useHistory } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthProvider'

function ProtectedRoute({ children, to, ...rest }) {
  const { authState } = React.useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authState.loged ? (
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