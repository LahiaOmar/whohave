import React from 'react'
import {PositionAction, SendMessage} from '../ButtonActions'
import Message from '../Message'
import MyMarker from '../MyMarker'
import {UserConsumer} from '../UsersMarkers'

function ConsumerAction({dispatch, coords, isExist}){
  console.log("consumerACtion ",coords)
  const handleChangePositon = ()=>{    
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const {lgt, lat} = position.coords
        const markerToAdd = <UserConsumer 
          longitude={lgt}
          latitude={lat}
          isDraggeble={true}
         />
        dispatch({
          type : 'add_marker&change_focus_map',
          marker : markerToAdd,
          longitude : lgt,
          latitude : lat
        })
      })
    }		
  }
  React.useEffect(()=>{
    if(isExist){
      const markerToAdd = <UserConsumer 
        longitude={coords.longitude}
        latitude={coords.latitude}
        isDraggeble={true}
        />
      dispatch({
        type : 'add_marker&change_focus_map',
        marker : markerToAdd,
        longitude : coords.longitude,
        latitude : coords.latitude
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