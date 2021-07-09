import React from 'react'
import { default as AlertUI } from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core'

import * as ALERT_ACTIONS from '../../Context/actions/AlertTypes'

const useStyles = makeStyles((theme) => ({
  rootUI: ({ bottom }) => ({
    position: 'fixed',
    bottom: `${bottom * 50}px`,
    right: '0px',
    margin: '0px 10px 10px 0px'
  })
}))

const Alert = ({ alert, alertDispatch, bottom }) => {

  const classes = useStyles({ bottom })

  const onCloseHandler = () => {
    alertDispatch(ALERT_ACTIONS.removeByKey(alert.key))
  }

  React.useEffect(() => {
    const timeToDelete = setTimeout(() => alertDispatch(ALERT_ACTIONS.removeTop()), 4000)
    return () => clearTimeout(timeToDelete)
  })

  return (
    <div className={classes.rootUI}>
      <AlertUI
        onClose={onCloseHandler}
        severity={alert.severity}>
        {alert.title}
      </AlertUI>
    </div>
  )
}

export default Alert