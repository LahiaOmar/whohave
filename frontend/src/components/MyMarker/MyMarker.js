import React from 'react'
import {Marker} from 'react-map-gl'
import { Icon } from '@material-ui/core'

function MyMarker({isDraggeble, children, longitude, latitude}){
  console.log("latghfj : ", longitude, latitude)
  const [position, setPosition] = React.useState({longitude, latitude})

  const handleChange = ({lngLat})=>{
    if(!isDraggeble) return
    const lgt = lngLat[0]
    const lat = lngLat[1]
    setPosition({longitude : lgt, latitude : lat})
  }

  return(
    <Marker
      longitude={position.longitude}
      latitude={position.latitude}
      draggable={isDraggeble}
      onDragEnd={handleChange}
    >
      {
        children
      }
    </Marker>
  )
}

export default MyMarker