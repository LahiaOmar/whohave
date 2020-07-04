import React from 'react'
import ReactMapGL,{Marker, GeolocateControl} from 'react-map-gl'
import {Fab } from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room';

function Map(){

	const [viewport, setViewport] = React.useState({
    width : 'calc(100%)',
		height : 'calc(100vh - 50px)',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
	})
	const [allMarker, setAllMarker] = React.useState([])
	const [myPosition, setMyPosition] = React.useState(null)
	const btnPosition = React.createRef()
	const key = "pk.eyJ1IjoibGFoaWFvbWFyIiwiYSI6ImNrYjM3a3hqMDA2ZDUycm85NjIxeGZiMTEifQ.cW7NWVSIF_5kJG7_Phfg9A"
	
	const addMarker = ({lngLat})=>{
		const prev = [...allMarker]
		prev.push(lngLat)
		setAllMarker(prev)
	}
	
	const userPosition = ({longitude, latitude}, options = {})=>{
		console.log("in", typeof longitude, latitude)
		setMyPosition({longitude, latitude})
		setViewport(prev => ({...prev, longitude : longitude, latitude : latitude, ...options}))
	}

	const handleMyPosition = (event)=>{
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition((position)=>{
				 userPosition(position.coords, {zome : 10})
			})
		}
	}
	const handleDraggableUSerEvent = (coords)=>{
		console.log(coords)
		const {lngLat} = coords
		const longitude = lngLat[0]
		const latitude = lngLat[1]
		userPosition({longitude, latitude})		
	}
	return (
		<div id="map">
			<div className="btnPosition">
				<Fab color="primary" onClick={handleMyPosition}>
					<RoomIcon />
				</Fab>
			</div>
			<ReactMapGL 
				{...viewport}
				mapboxApiAccessToken={key}
				onViewportChange={nextViewport => {setViewport(nextViewport)}}
				onClick={(e)=>{
					addMarker(e)
					// set position of the store
				}}>
				{
					myPosition &&
					<Marker
						draggable={true}
						onDragEnd={handleDraggableUSerEvent} 
						longitude={myPosition.longitude}
						latitude={myPosition.latitude}>
						<RoomIcon fontSize="large" />
				</Marker>
				}
			</ReactMapGL>
		</div >
  )
}

export default Map