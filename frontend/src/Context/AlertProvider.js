import React from 'react'
import AlertReducer, { initialState } from './reducers/AlertReducer'

const AlertContext = React.createContext(initialState)

const AlertProvider = ({ children }) => {
  const [alertState, alertDispatch] = React.useReducer(
    AlertReducer,
    initialState
  )

  return (
    <AlertContext.Provider value={{ alertState, alertDispatch }}>
      {children}
    </AlertContext.Provider>
  )

}

export { AlertContext }
export default AlertProvider