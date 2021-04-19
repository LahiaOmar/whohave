import React from 'react'
import { Fab } from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room';

function PositionAction({ onClick }) {

  return (
    <Fab color="primary" onClick={onClick} >
      <RoomIcon />
    </Fab>
  )
}

export default PositionAction