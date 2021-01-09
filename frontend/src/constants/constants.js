export const MAP_REDUCER_CONST = {
  ADD_MARKER: 'addMarker',
  SET_MARKERS: 'setMarkers',
  SET_VIWEPORT: "setViewPort",
  SET_SELF_POSITION_LNGLAT: "setSelfPositionLngLat",
  SET_USER_MARKER: "setUserMaker",
  SET_MAP_CENTER_VIEW: "setMapCenterView"
}

export const MAP_INIT_CONST = {
  VIEWPROT: {
    width: '80vw',
    height: '80vh',
    latitude: 31.669746,
    longitude: -7.973328,
    zoom: 8
  }
}
export const NOTIFICATIONS_REDUCER = {
  CHECK_BYID: 'CHECK_BYID',
  CHECK_ALL: 'CHECK_ALL',
  DELETE: 'DELETE',
  ADD: 'ADD',
  UPDATE: 'UPDATE',
}
export const MARKER_TYPE = {
  CONSUMER: 'consumer',
  STOREOWNER: 'storeOwner',
  STORE_POSITON: 'storePosition'
}