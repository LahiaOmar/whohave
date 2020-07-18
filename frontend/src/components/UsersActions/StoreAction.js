import React from 'react'
import {PositionAction, StoreOpen} from '../ButtonActions'
import MyMarker from '../MyMarker'
import {UserStore} from '../UsersMarkers'


function StoreAction({dispatch, coords, isExist}){
  
  const getMarker = (longitude, latitude)=>{
    return <UserStore
        longitude={longitude}
        latitude={latitude}
        isDraggeble={true}
     />
  }

  const handleShowPosition = ()=>{
    if(!isExist){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
          const {longitude, latitude} = position.coords
          const markerToAdd = getMarker(longitude, latitude)
          console.log("set markers")
          dispatch({
            type : 'add_marker&change_focus_map',
            marker : markerToAdd,
            longitude : longitude,
            latitude : latitude
          })
        })
      }		
    }
    else{
      const markerToAdd = getMarker(coords.longitude, coords.latitude) 
      const {longitude, latitude} = coords
      dispatch({
        type : 'add_marker&change_focus_map',
        marker : markerToAdd,
        longitude : longitude,
        latitude : latitude
      })
    }
  }

  return (
    <div className="actions">
      <PositionAction handler={handleShowPosition}/>
      <StoreOpen />
    </div>
  )
}

export default StoreAction