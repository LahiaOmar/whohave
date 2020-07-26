import React from 'react'


const LoginContext = React.createContext({
  isLoged : false,
  type : undefined,
  userData : {},
  redirect : {},
  setContext : ()=>{}
})

export default LoginContext