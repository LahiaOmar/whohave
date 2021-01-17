import React from 'react'
import LoginContext from '../../ContextAuth'
import Axios from 'axios'
import io from 'socket.io-client'

function useNotifications() {
  const { userData, type } = React.useContext(LoginContext)
  const [loading, setLoading] = React.useState(true)
  const [state, dispatch] = React.useReducer((state, action) => {
    let newState = [...state]
    switch (action.type) {
      case 'CHECK_BYID':
        newState = newState.map(element => {
          if (element._id === action.id) {
            element.isSelected = !element.isSelected
          }
          return element
        })
        break;
      case 'CHECK_ALL':
        newState = newState.map(element => {
          element.isSelected = action.isSelected
          return element
        })
        break;
      case 'DELETE':
        newState = newState.filter((element => !action.idsArr.includes(element._id)))
        break;
      case 'ADD':
        newState.push(action.newNotification)
        break;
      case 'UPDATE':
        newState = action.newNotifications
        break;
      default:
        console.log("error action type")
    }
    return newState
  }, [])


  const isConnectedHandler = async () => {
    const config = {
      method: 'POST',
      url: 'http://localhost:4000/api/notifications/get',
      data: {
        type: type,
        userId: userData._id
      }
    }
    const { data } = await Axios(config)
    const newNotifications = data.notifications.map(e => {
      e.isSelected = false
      return e
    })
    dispatch({ type: 'UPDATE', newNotifications })
  }

  React.useEffect(() => {
    if (state.length > 0) {
      setLoading(false)
    }
  }, [state])

  const addNotification = (data) => {
    console.log("new notification ", data)
    const newNotification = JSON.parse(data)
    newNotification.isSelected = false
    dispatch({ type: 'ADD', newNotification })
  }

  React.useEffect(() => {
    const options = {
      query: {
        userId: userData._id,
        type: type
      }
    }
    const pathSocket = process.env.REACT_APP_PATH_SOCKET
    const socket = io(pathSocket, options)
    socket.on('connect', () => isConnectedHandler())
    socket.on('newNotification', addNotification)

    return () => {
      socket.close()
    }
  }, [])

  return [state, dispatch, loading]
}

export default useNotifications