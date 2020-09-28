import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import LoginContext from '../ContextAuth'
import NotificationImages from '../NotificationImages'
import NotificationStoreBtn from '../NotificationStoreBtn'
import NotificationConsumerBtn from '../NotificationConsumerBtn'
import NotificationInformations from '../NotificationInformations'

const NotificationPanel = ()=>{  
  const context = React.useContext(LoginContext)
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

  const removeNotification = async (index)=>{
    let step = 1
    if(index === 0){ 
      step = 0
    }
    const config = {
      method : 'POST',
      url : process.env.REACT_APP_UPDATE_USER,
      data : {
        type : context.type,
        userId : context.userData._id,
        forUpdate : {
          $pull : {
            notifications : {
              _id : notifications[index]._id 
            }
          }
        }
      }
    }
    try{
      const response = await axios(config)
      setNotifications(notifications.splice(index, step))

    }catch(err){
      console.log("error", err)
    }
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