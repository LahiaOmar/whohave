import React from 'react'
import { default as AlertUI } from '@material-ui/lab/Alert'
import { AlertContext } from '../../Context/AlertProvider'
import * as ALERT_ACTIONS from '../../Context/actions/AlertTypes'

const Alert = ({ alert, alertDispatch, bottom }) => {

  const onCloseHandler = () => {
    alertDispatch(ALERT_ACTIONS.removeByKey(alert.key))
  }

  React.useEffect(() => {
    const timeToDelete = setTimeout(() => alertDispatch(ALERT_ACTIONS.removeTop()), 4000)
    return () => clearTimeout(timeToDelete)
  })

  return (
    <div style={{
      position: 'fixed',
      bottom: `${bottom * 50}px`,
      right: '0px',
      margin: '0px 10px 10px 0px'
    }}>
      <AlertUI

        onClose={onCloseHandler}
        severity={alert.severity}>
        {alert.title}
      </AlertUI>
    </div>
  )
}

const AlertMessage = () => {
  const { alertState, alertDispatch } = React.useContext(AlertContext)

  React.useEffect(() => {
    console.log("adding new alert ")
  }, [alertState])

  return (
    <div style={{
      position: 'fixed',
      bottom: '0px',
      right: '0px',
    }}>
      {
        alertState.map((alert, i) =>
          <Alert
            key={alert.key}
            alert={alert}
            alertDispatch={alertDispatch}
            bottom={i} />)
      }
    </div>
  )
}

export default AlertMessage