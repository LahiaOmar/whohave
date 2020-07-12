import React from 'react'
import StoreIcon from '@material-ui/icons/Store';
import MyMarker from '../MyMarker';

function UserStore({longitude, latitude}){
  return (
    <MyMarker
    longitude={longitude}
    latitude={latitude}
    isDraggeble={true}
    >
      <StoreIcon fontSize="large"/>
    </MyMarker>
  )
}

export default UserStore