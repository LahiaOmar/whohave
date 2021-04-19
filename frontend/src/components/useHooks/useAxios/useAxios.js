import axios from 'axios'
import React from 'react'


function useAxios(conf) {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState({ status: false, payload: {} })
  const [config, setConfig] = React.useState(conf)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    async function changeConfig() {
      if (Object.keys(config).length > 0) {
        try {
          setLoading(true)
          const { data } = await axios(config)
          setData(data)
          setError({ status: false, paylad: '' })
          setLoading(false)
        }
        catch (err) {
          if (err.response) {
            console.log("err in response", err.response)
            setError({
              status: true,
              payload: err.response
            })
          }
          else if (err.request) {
            console.log("err in request", err.request)
            setError({
              status: true,
              payload: err.request
            })
          }
          else {
            setError({
              status: true,
              payload: err.message
            })
            console.log("err in setting maybe !!", err.message)
          }
          setLoading(false)
        }
      }
    }

    changeConfig()
  }, [config])

  return [data, error, loading, setConfig]
}

export default useAxios