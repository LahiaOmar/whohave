import React from 'react'
import ReactMapGL,{Marker} from 'react-map-gl'

function Map(){

	const [viewport, setViewport] = React.useState({
    width : 'calc(100%)',
		height : 'calc(100vh - 50px)',
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
	})
	const [allMarker, setAllMarker] = React.useState([])
  const key = "pk.eyJ1IjoibGFoaWFvbWFyIiwiYSI6ImNrYjM3a3hqMDA2ZDUycm85NjIxeGZiMTEifQ.cW7NWVSIF_5kJG7_Phfg9A"
	
	const addMarker = ({lngLat})=>{
		const prev = [...allMarker]
		prev.push(lngLat)
		setAllMarker(prev)
	}
	
	return (
		<div id="map">
			<div id="map-actions">
				<button >set your postion</button>
			</div>
			<ReactMapGL 
				{...viewport}
				mapboxApiAccessToken={key}
				onViewportChange={nextViewport => {setViewport(nextViewport)}}
				onClick={(e)=>{
					addMarker(e)
				}}
			>
				{
					allMarker.map((corr)=>
						<Marker
							latitude={corr[1]}
							longitude={corr[0]}>Marker</Marker>  
					)
				}
			</ReactMapGL>
		</div >
  )
}

export default Map