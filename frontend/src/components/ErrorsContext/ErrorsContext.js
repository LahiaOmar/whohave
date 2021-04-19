import React from 'react'

const ErrorsContext = React.createContext({
  errors: [],
  errorsDispatch: () => { }
})

export default ErrorsContext