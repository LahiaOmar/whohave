// AYTHENTICATION ACTIONS
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const TOKEN_CHECKING = 'CHECKING'
export const TOKEN_DONE = 'DONE'

export const login = (data) => {
  return {
    type: LOGIN,
    pyload: {
      ...data
    }
  }
}
export const tokenVerification = (isValid, data) => {
  return {
    type: TOKEN_DONE,
    pyload: {
      isValid,
      profile: { ...data }
    }
  }
}
export const logout = () => {
  return {
    type: LOGOUT
  }
}
