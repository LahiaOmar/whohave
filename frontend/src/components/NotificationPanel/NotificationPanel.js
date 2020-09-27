import React from 'react'
import io from 'socket.io-client'
import {useAxios} from '../useHooks'
import LoginContext from '../ContextAuth'
import NotificationImages from '../NotificationImages'
import NotificationStoreBtn from '../NotificationStoreBtn'
import NotificationConsumerBtn from '../NotificationConsumerBtn'
import NotificationInformations from '../NotificationInformations'

const NotificationPanel = ()=>{  
  const context = React.useContext(LoginContext)
  const [data, loading, error, setConfig] = useAxios({})
  const [notifications, setNotifications] = React.useState(context.userData.notifications)
  
  React.useEffect(()=>{
    const options = {
      query : {
        userId : context.userData._id,
        type : context.type
      }
    }
    const socket = io('http://localhost:4000', options)
    socket.on("newNotification", (data)=>{
      const newProduct = JSON.parse(data)
      setNotifications(notifications.concat(newProduct))
    })

    return ()=>{
      socket.close()
    }
  },[])

  const removeNotification = (index)=>{
    let step = 1
    if(index === 0){ 
      step = 0
    }
    
    setNotifications(notifications.splice(index, step))
  }

  return(
    <div id="notifications">
      {
        notifications.map( (notification, i) =>{ 
          const {informations, images } = notification
          return(
            <div className="single-notification" key={i}> 
              <NotificationInformations informations={informations} />
              <NotificationImages images={images} />
              {
                context.type 
                ? <NotificationStoreBtn index={i} removeNotification={removeNotification} />
                : <NotificationConsumerBtn index={i} removeNotification={removeNotification} />
              }
            </div>
          ) 
        })
      }
    </div>
  )
}

export default NotificationPanel