import React from 'react'
import ReactMapGL from 'react-map-gl'
import { PositionAction } from '../ButtonActions'
import MyMarker from '../MyMarker'
import MyModal from '../Mymodal'
import constants from '../../constants'
import LoginContext from '../ContextAuth'

function reducer(state, action) {
	let newState = { ...state }

	switch (action.type) {
		case constants.MAP_REDUCER_CONST.ADDMARKER:
			newState.markers.push(action.data)
			break;
		case constants.MAP_REDUCER_CONST.SET_USER_MARKER:
			newState = { ...newState, userMarker: action.data }
			break;
		case constants.MAP_REDUCER_CONST.SET_MARKERS:
			newState = { ...newState, markers: action.data }
			break;
		case constants.MAP_REDUCER_CONST.SET_VIWEPORT:
			newState = { ...newState, viewport: action.data }
			break;
		case constants.MAP_REDUCER_CONST.SET_SELF_POSITION_LNGLAT:
			newState = { ...newState, userLngLat: action.data }
			break;
		case constants.MAP_REDUCER_CONST.SET_VIEWPORT:
			newState = { ...newState, viewport: action.data }
			break;
		default:
			console.log("action", action)
			throw Error("wrong action type")
	}
	return newState
}

function Map({ listOfPosition, selfPositionOnChange }) {
	const { type } = React.useContext(LoginContext)
	const key = process.env.REACT_APP_MAP_KEY
	const [state, dispatch] = React.useReducer(reducer, {
		viewport: constants.MAP_INIT_CONST.VIEWPROT,
		markers: [],
		userMarker: null,
		userLngLat: null
	})

	React.useEffect(() => {
		console.log("update list of positions.")
	}, [listOfPosition])

	const setUserLngLat = (lngLat) => {
		const longitude = lngLat[0]
		const latitude = lngLat[1]
		dispatch({
			type: constants.MAP_REDUCER_CONST.SET_SELF_POSITION_LNGLAT,
			data: { longitude, latitude }
		})
	}

	const getSelfPosition = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const { longitude, latitude } = position.coords
				const lngLat = [longitude, latitude]
				selfPositionOnChange({ longitude, latitude })
				setUserLngLat(lngLat)
			})
		}
		else {
			return false
		}
	}

	React.useEffect(() => {
		if (state.userLngLat) {
			const { longitude, latitude } = state.userLngLat
			let typeUser = ''
			if (type) {
				typeUser = type ? constants.MARKER_TYPE.STOREOWNER : constants.MARKER_TYPE.CONSUMER
			}
			else {
				typeUser = constants.MARKER_TYPE.STOREOWNER
			}
			const userMarker = <MyMarker
				handleChangeMarker={({ lngLat }) => setUserLngLat(lngLat)}
				lngLat={{ longitude, latitude }}
				isDraggeble={true}
				iconType={typeUser} />
			dispatch({
				type: constants.MAP_REDUCER_CONST.SET_USER_MARKER,
				data: userMarker
			})
		}
	}, [state.userLngLat])

	React.useEffect(() => {
		if (listOfPosition) {
			const mapMarkers = listOfPosition.map(({ longitude, latitude }) =>
				<MyMarker
					lngLat={{ longitude, latitude }}
					isDraggeble={false}
					iconType={constants.MARKER_TYPE.STORE_POSITON} />)
			dispatch({
				type: constants.MAP_REDUCER_CONST.SET_MARKERS,
				data: mapMarkers
			})
		}
	}, [])
	return (
		<div id="map">
			<div className="btnPosition">
				<PositionAction onClick={getSelfPosition} />
			</div>
			<ReactMapGL
				{...state.viewport}
				mapboxApiAccessToken={key}
				onViewportChange={nextViewport => {
					dispatch({
						type: constants.MAP_REDUCER_CONST.SET_VIWEPORT,
						data: nextViewport
					})
				}}>
				{
					state.userMarker && state.userMarker
				}
				{
					state.markers && state.markers.map(marker => marker)
				}
			</ReactMapGL>
		</div >
	)
}

export default Map