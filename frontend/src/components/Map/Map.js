import React from 'react'
import mapboxgl from 'mapbox-gl'
import {
	Grid,
} from '@material-ui/core'
import { PositionAction } from '../ButtonActions'

const {
	REACT_APP_MAP_KEY
} = process.env

function Map({ markersPosition = [], style = { width: '300px', height: '300px' }, selfLocation, ...rest }) {
	const [mp, setMp] = React.useState(null)
	const [userLocation, setUserLocation] = React.useState(selfLocation)
	const [userMarker, setUserMarker] = React.useState(null)

	React.useEffect(() => {
		console.log("user effect _mp")
		mapboxgl.accessToken = REACT_APP_MAP_KEY
		const _mp = new mapboxgl.Map({
			container: "map",
			style: "mapbox://styles/mapbox/streets-v11",
			center: [-74, 40],
			zoom: 9
		})
		setMp(_mp)
	}, [])

	React.useEffect(() => {
		if (markersPosition.length > 0 && mp) {
			console.log("use effect markerposition")
			const markers = markersPosition.map(marker => createMarker(marker))
			const boundes = markersBoundes(markers)
			mp.fitBounds(boundes, { padding: 20, offset: [0, 100], maxZoom: 7 })
		}
	}, [markersPosition, mp])

	React.useEffect(() => {
		if (userMarker) {
			const boundes = markersBoundes([userMarker])
			mp.fitBounds(boundes, { padding: 20, offset: [0, 100], maxZoom: 7 })
		}
	}, [userMarker])

	React.useEffect(() => {
		if (mp && userLocation) {
			if (userLocation.coordinates.length > 0) {
				if (userMarker) userMarker.remove()
				const marker = createMarker(userLocation)
				setUserMarker(marker)
			}
		}
	}, [mp, userLocation])

	const getUserPosition = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { longitude, latitude } = position.coords
				setUserLocation(prev => ({ ...prev, coordinates: [longitude, latitude] }))
				if (userLocation)
					userLocation.changePosition([longitude, latitude])
			})
		}
	}

	const createMarker = ({ coordinates, type, draggable, changePosition }) => {
		const markerColor = type === 'STORE' ? 'red' : 'blue'
		const marker = new mapboxgl.Marker({ color: markerColor, draggable })
		marker.setLngLat(coordinates)
		if (draggable) {
			marker.on('dragend', ({ target }) => {
				const lngLat = target.getLngLat()
				changePosition([lngLat.lng, lngLat.lat])
			})
		}
		return marker
	}

	const markersBoundes = (markers) => {
		const boundes = new mapboxgl.LngLatBounds()
		markers.forEach(marker => {
			marker.addTo(mp)
			const lngLat = marker.getLngLat()
			boundes.extend(new mapboxgl.LngLat(lngLat.lng, lngLat.lat))
		})
		return boundes
	}

	return (
		<Grid item xs={12} id="map" style={style} {...rest}>
			{
				selfLocation
				&&
				<div className="btnPosition">
					<PositionAction onClick={getUserPosition} />
				</div>
			}
		</Grid >
	)
}

export default Map