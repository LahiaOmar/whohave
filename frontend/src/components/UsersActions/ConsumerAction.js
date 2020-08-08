import React from 'react'
import {PositionAction, SendMessage} from '../ButtonActions'
import Message from '../Message'
import MyMarker from '../MyMarker'
import {UserConsumer} from '../UsersMarkers'

function ConsumerAction({dispatch, coords, isExist}){
  const handleChangePositon = ()=>{    
    if(!isExist){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
          const {longitude, latitude} = position.coords
          const markerToAdd = <UserConsumer 
            longitude={longitude}
            latitude={latitude}
            isDraggeble={true}
           />
          dispatch({
            type : 'add_marker&change_focus_map',
            marker : markerToAdd,
            longitude : longitude,
            latitude : latitude
          })
        })
      }		
    }
  }

  React.useEffect(()=>{
    if(isExist){
      const {longitude, latitude} = coords
      const markerToAdd = <UserConsumer 
      longitude={longitude}
      latitude={latitude}
      isDraggeble={true}
      />
      dispatch({
        type : 'add_marker&change_focus_map',
        marker : markerToAdd,
        longitude : longitude,
        latitude : latitude
      })
    }
  },[])

  return (
    <div className="actions">
      <div className="position-action">
        <PositionAction handler={handleChangePositon}/>
      </div>
      <div className="send-product-action">
        <Message />
      </div>
    </div>
  )
}

export default ConsumerAction