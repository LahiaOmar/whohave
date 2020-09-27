import axios from 'axios'
import React from 'react'
import { object } from 'yup'


function useAxios(conf){ 
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(false)
  const [config, setConfig] = React.useState(conf)
  const [loading, setLoading] = React.useState(false)
  
  const changeConfig = async ()=>{
    if(Object.keys(config).length > 0){
      setLoading(true)
      try{
        const response = await axios(config)  
        setData(response.data)
        setError(false)
        setLoading(false)
      }
      catch(err){
        setError(true)
        setLoading(false)
      }
    }
  }

  React.useEffect(()=>{
    changeConfig()
  }, [config])
  
  return [data, error, loading, setConfig]
}

export default useAxios