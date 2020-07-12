import React from 'react'
import ReactMapGL,{Marker, GeolocateControl} from 'react-map-gl'


function Map(props){

	const [viewport, setViewport] = React.useState(props.viewPort)
	const key = process.env.REACT_APP_MAP_KEY

	return (
		<div id="map">
			<div className="btnPosition">
				
			</div>
			<ReactMapGL 
				{...viewport}
				mapboxApiAccessToken={key}
				onViewportChange={nextViewport => {setViewport(nextViewport)}}
			>
				{
					props.children
				}
			</ReactMapGL>
		</div >
  )
}

export default Map