import React from 'react'
import StoreIcon from '@material-ui/icons/Store';
import MyMarker from '../MyMarker';
import axios from 'axios'
import LoginContext from '../ContextAuth'

function UserStore({longitude, latitude, isDraggeble}){
  
  const [coords, setCoords] = React.useState({longitude, latitude})
  const context = React.useContext(LoginContext)
  const POST_URL = process.env.REACT_APP_PATH_SET_POSITIONS

  const handleChangeMarker = ({lngLat})=>{
    if(!isDraggeble) return
    const lgt = lngLat[0]
    const lat = lngLat[1]

    axios.post(POST_URL, {
      _id : context.user.userData._id,
      type : context.user.type,
      longitude : lgt, 
      latitude : lat})
    setCoords({longitude : lgt, latitude : lat})
  }

  return (
    <MyMarker
    longitude={coords.longitude}
    latitude={coords.latitude}
    isDraggeble={isDraggeble}
    handleChangeMarker={handleChangeMarker}
    >
      <StoreIcon fontSize="large"/>
    </MyMarker>
  )
}

export default UserStore