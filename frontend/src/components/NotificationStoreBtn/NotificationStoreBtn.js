import React from 'react'

const NotificationStoreBtn = ({index, removeNotification})=>{
  
  const iHave = (e)=>{
    e.preventDefault()
    removeNotification(index)
  }

  const iDontHave = (e)=>{
    e.preventDefault()
    console.log("i dont have")
    removeNotification(index)
  }

  return(
    <div>
      <button onClick={iHave}>i have</button>
      <button onClick={iDontHave}>i don't have</button>
    </div>
  )
}

export default NotificationStoreBtn