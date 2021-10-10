import React from 'react'
import { makeStyles, Chip } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const Channel = () => {
  const CONNECT = "primary"
  const DISCONNECT = "secondary"
  const INIT_REDUCER = { subscribe: true, color: 'primary', deleteIcon: <CheckCircleIcon /> }

  const [{ subscribe, color, deleteIcon }, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case CONNECT:
        return { subscribe: true, color: 'primary', deleteIcon: <CheckCircleIcon /> }
      case DISCONNECT:
        return { subscribe: false, color: 'secondary', deleteIcon: <CheckCircleOutlineIcon /> }
    }
  }, INIT_REDUCER)

  const onDelete = () => {
    const type = subscribe ? DISCONNECT : CONNECT
    dispatch({ type })
  }

  return (
    <Chip label="Channel Name" color={color} onDelete={onDelete} deleteIcon={deleteIcon} />
  )
}

export default Channel