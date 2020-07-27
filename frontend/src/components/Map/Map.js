import React from 'react'
import ReactMapGL from 'react-map-gl'

function Map(props){
	const [viewport, setViewport] = React.useState(props.state.viewPort)
	const key = process.env.REACT_APP_MAP_KEY

	const handleNextViewPort = (next)=>{
		console.log("next", next)
		setViewport(next)
	}
	
	React.useEffect(()=>{
		if(props.state.viewPort.longitude !== viewport.longitude && 
			props.state.viewPort.latitude !== viewport.latitude){
			setViewport(props.state.viewPort)
		}
	},[props.state.viewPort])

	return (
		<div id="map">
			<ReactMapGL 
				{...viewport}
				mapboxApiAccessToken={key}
				onViewportChange={nextViewport => {handleNextViewPort(nextViewport)}}
			>
				{
					props.children
				}
			</ReactMapGL>
		</div >
  )
}

export default Map