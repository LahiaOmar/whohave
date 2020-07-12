import React from 'react'
import MyMarker from '../MyMarker'
import RoomIcon from '@material-ui/icons/Room';

function UserConsumer({longitude, latitude}){
  
  return(
    <MyMarker
      isDraggeble={true}
      longitude={longitude}
      latitude={latitude}
    >
      <RoomIcon fontSize="large" />
    </MyMarker>
  )
}

export default UserConsumer