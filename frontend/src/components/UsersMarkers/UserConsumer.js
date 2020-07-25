import React from 'react'
import MyMarker from '../MyMarker'
import RoomIcon from '@material-ui/icons/Room';
import axios from 'axios'
import LoginContext from '../ContextAuth'

function UserConsumer({longitude, latitude, isDraggeble}){
  console.log("USerConsumer ",longitude, latitude )
  const [coords, setCoords] = React.useState({longitude, latitude})
  const context = React.useContext(LoginContext)  
  const _ID = context.user.userData._id
  const TYPE = context.user.type
  const POST_URL = process.env.REACT_APP_PATH_SET_POSITIONS

  const handleChangeMarker = ({lngLat})=>{
    if(!isDraggeble) return
    const lgt = lngLat[0]
    const lat = lngLat[1]
    axios.post(POST_URL, { _id : _ID, type : TYPE, longitude : lgt, latitude : lat })
    setCoords({longitude : lgt, latitude : lat})
  }
  return(
    <MyMarker
      isDraggeble={isDraggeble}
      longitude={coords.longitude}
      latitude={coords.latitude}
      handleChangeMarker={handleChangeMarker}
    >
      <RoomIcon fontSize="large" />
    </MyMarker>
  )
}

export default UserConsumer