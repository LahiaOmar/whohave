import React from 'react'
import {Marker} from 'react-map-gl'
import {Fab} from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room';
import MyMarker from '../MyMarker'

function PositionAction({handler}){
  
  return(
      <Fab color="primary" onClick={handler} >
        <RoomIcon />
      </Fab>
  )
}

export default PositionAction