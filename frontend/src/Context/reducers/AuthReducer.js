import * as AUTH_TYPES from '../actions/AuthTypes'

const authInitialState = {
  validationToken: {
    status: AUTH_TYPES.TOKEN_CHECKING
  },
  loged: false,
  profile: {},
}

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.LOGIN:
      return {
        ...state,
        loged: true,
        profile: {
          ...action.pyload
        }
      }
    case AUTH_TYPES.LOGOUT:
      return authInitialState
    case AUTH_TYPES.TOKEN_DONE:
      return {
        loged: action.pyload.isValid,
        validationToken: { status: AUTH_TYPES.TOKEN_DONE },
        profile: {
          ...action.pyload.profile
        }
      }
    default:
      return state
  }
}

export { authInitialState }
export default authReducer