import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'
import { v4 as uuidv4 } from 'uuid';
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
      setNotifications([...notifications].concat(newProduct))
    })

    return ()=>{
      socket.close()
    }
  },[])

  const removeNotification = async (notificationId)=>{
    let index = -1
    let step = 1
    notifications.forEach((nt, ind)=>{
      if(nt._id === notificationId){
        index = ind
      }
    })
    if(index === 0){
      step = 0;
    }
    console.log("index of notif ", index)
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
      const newNotif = [...notifications]
      delete newNotif[index]
      setNotifications(newNotif)
    }catch(err){
      console.log("error", err)
    }
  }

  return(
    <div id="notifications">
      {
        notifications && notifications.map( (notification, i) =>{ 
          const {informations, images ,_id:notificationId} = notification
          const uid = uuidv4()
          return(
            <div className="single-notification" key={uid}>
              <NotificationInformations informations={informations} />
              <NotificationImages images={images} />
              {
                context.type 
                ? <NotificationStoreBtn index={notificationId} removeNotification={removeNotification} />
                : <NotificationConsumerBtn index={notificationId} removeNotification={removeNotification} />
              }
            </div>
          ) 
        })
      }
    </div>
  )
}

export default NotificationPanel