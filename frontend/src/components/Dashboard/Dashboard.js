import React from 'react'
import {Grid} from '@material-ui/core'
import Map from '../Map'
import LoginContext from '../ContextAuth'
import {UserStore, UserConsumer} from '../UsersMarkers'
import MyMarker from '../MyMarker'
import {StoreOpen} from '../ButtonActions'
import Message from '../Message'
import { StoreAction, ConsumerAction } from '../UsersActions'

function reducer(state, action){
	console.log("actual state : ", state)
	const actionsTypes = action.type.split("&")
	let newState = {...state}
	for(let act of actionsTypes){	
		switch(act){
			case 'add_marker' : 
				newState = { ...newState, markers: state.markers.concat(action.marker)}
				break
			case 'change_focus_map' :
				newState = { ...newState,viewPort : {
					...newState.viewPort,
					longitude : action.longitude,
					latitude : action.latitude
				}}
				break
		}
	}
	console.log("new State", newState)
	if(Object.keys(newState).length === 0) throw new Error("dashboard reducer error")
	return newState
}

function Dashboard(){
	const context = React.useContext(LoginContext)
	const start = {latitude : 31.669746 , longitude :-7.973328}
	const isExistCoord = context.user.userData.coordinates.length !== 0
	const startCoord =  isExistCoord ? 
		{longitude : context.user.userData.coordinates[0] , latitude : context.user.userData.coordinates[1] }: start
	console.log("start coods ", startCoord)
		const [state, dispatch] = React.useReducer(reducer, {
		viewPort : {
			width : 'calc(100%)',
			height : 'calc(100vh - 50px)',
			...startCoord,
			zoom: 8
		},
		markers : [],
		userCoords : {
			...startCoord
		},
	})
	
	return (	
		<div id="dashboard">
			<Grid container spacing={0}>
				<Grid item xs={2} >
					<div>Store notificaions </div>
				</Grid>
				<Grid item xs={10}> 
					<div className="btnPosition">
						{
							context.user.type
							?<StoreAction
									dispatch={dispatch}
									coords={state.userCoords}
									isExist={isExistCoord}
								/>
							:<ConsumerAction
									coords={state.userCoords} 
									dispatch={dispatch}
									isExist={isExistCoord}/>
						}
					</div>
					<Map
						state={state}>
							{
								state.markers.map((marker)=>(marker))
							}
					</Map>
				</Grid>
			</Grid>            
		</div>
	)
}

export default Dashboard