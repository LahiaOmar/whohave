import * as ACTION_TYPES from '../actions/AlertTypes'
import { v4 as uui } from 'uuid'

const initialState = []

const AlertReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ALERT:
      return [
        ...state,
        { ...action.pyload, key: uui() }
      ]
    case ACTION_TYPES.REMOVE_BY_ID:
      return state.filter(err => err.key !== action.pyload.key)
    case ACTION_TYPES.REMOVE_TOP:
      return state.slice(0, -1)
    default:
      return state
  }
}

export { initialState }
export default AlertReducer