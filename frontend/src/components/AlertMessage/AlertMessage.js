import React from 'react'
import { makeStyles } from '@material-ui/core'
import { AlertContext } from '../../Context/AlertProvider'
import Alert from './Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: '0px',
    right: '0px',
  }
}))

const AlertMessage = () => {
  const { alertState, alertDispatch } = React.useContext(AlertContext)
  const classes = useStyles()

  return (
    <div className={classes.root}>
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