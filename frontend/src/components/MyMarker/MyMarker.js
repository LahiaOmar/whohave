import React from 'react'
import {Marker} from 'react-map-gl'
import { Icon } from '@material-ui/core'

function MyMarker({isDraggeble, children, longitude, latitude, handleChangeMarker}){
  console.log("latghfj : ", longitude, latitude)

  return(
    <Marker
      longitude={longitude}
      latitude={latitude}
      draggable={isDraggeble}
      onDragEnd={handleChangeMarker}
    >
      {
        children
      }
    </Marker>
  )
}

export default MyMarker