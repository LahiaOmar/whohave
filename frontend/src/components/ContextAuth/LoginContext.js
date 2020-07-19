import React from 'react'


const LoginContext = React.createContext({
  user : {
    isLoged : false,
    isStore : false,
  },
  setUser : ()=>{}
})

export default LoginContext