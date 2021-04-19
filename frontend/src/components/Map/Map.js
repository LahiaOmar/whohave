import React from 'react'
import mapboxgl from 'mapbox-gl'

import { PositionAction } from '../ButtonActions'

function Map({ markersPosition = [], style = {}, userPositionHandler }) {
	const [mp, setMp] = React.useState(null)
	const [userCoordination, setUserCoordination] = React.useState(null)
	const [selfPosition, setSelfPosition] = React.useState()

	React.useEffect(() => {
		mapboxgl.accessToken = process.env.REACT_APP_MAP_KEY
		const _mp = new mapboxgl.Map({
			container: "map",
			style: "mapbox://styles/mapbox/streets-v11",
			center: [-74, 40],
			zoom: 9
		})
		setMp(_mp)
	}, [])

	const getUserPosition = () => {
		console.log("getUserPosition")
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { longitude, latitude } = position.coords
				userPositionHandler([longitude, latitude])
				setUserCoordination([longitude, latitude])
			})
		}
	}

	React.useEffect(() => {
		if (userCoordination) {
			const userMarker = getMarker(userCoordination, { draggable: true })
			userMarker.on('dragend', ({ target }) => {
				const { lng, lat } = target._lngLat
				userPositionHandler([lng, lat])
			})
			userMarker.addTo(mp)
			const boundes = new mapboxgl.LngLatBounds()
			boundes.extend(new mapboxgl.LngLat(userCoordination[0], userCoordination[1]))
			mp.fitBounds(boundes, { padding: 20, offset: [0, 100], maxZoom: 7 })
		}
	}, [userCoordination])

	const getMarker = (position, config = {}) => {
		const marker = new mapboxgl.Marker({ color: '#FFFFFF', ...config })
		marker.setLngLat(position)
		return marker
	}

	React.useEffect(() => {
		if (markersPosition.length > 0 && mp) {
			const boundes = new mapboxgl.LngLatBounds()
			markersPosition.forEach(position => {
				const marker = getMarker(position)
				marker.addTo(mp)
				boundes.extend(new mapboxgl.LngLat(position[0], position[1]))
			})
			mp.fitBounds(boundes, { padding: 20, offset: [0, 100], maxZoom: 7 })
		}
	}, [markersPosition, mp])

	return (
		<div id="map" style={style}>
			<div className="btnPosition">
				<PositionAction onClick={getUserPosition} />
			</div>
		</div >
	)
}

export default Map