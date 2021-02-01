import axios from 'axios'
import React from 'react'


function useAxios(conf) {
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(false)
  const [config, setConfig] = React.useState(conf)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    async function changeConfig() {
      if (Object.keys(config).length > 0) {
        try {
          setLoading(true)
          const { data } = await axios(config)
          setData(data)
          setError(false)
          setLoading(false)
        }
        catch (err) {
          setError(true)
          setLoading(false)
        }
      }
    }

    changeConfig()
  }, [config])

  return [data, error, loading, setConfig]
}

export default useAxios