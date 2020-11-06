import { Switch } from '@material-ui/core'
import React from 'react'
import { Marker } from 'react-map-gl'
import constants from '../../constants'
import RoomIcon from '@material-ui/icons/Room';
import StoreIcon from '@material-ui/icons/Store';

function MyMarker({ isDraggeble, lngLat, handleChangeMarker, iconType }) {
  console.log("lngLat mymarker ", lngLat)
  const { longitude, latitude } = lngLat
  const getIcone = () => {
    switch (iconType) {
      case constants.MARKER_TYPE.CONSUMER:
        return <RoomIcon fontSize="large" />
        break;
      case constants.MARKER_TYPE.STOREOWNER:
        return <StoreIcon fontSize="large" />
        break;
      case constants.MARKER_TYPE.STORE_POSITON:
        return <StoreIcon fontSize="large" />
        break;
      default:
        throw Error("error type Marker")
    }
  }

  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      draggable={isDraggeble}
      onDragEnd={handleChangeMarker}
    >
      {
        getIcone()
      }
    </Marker>
  )
}

export default MyMarker