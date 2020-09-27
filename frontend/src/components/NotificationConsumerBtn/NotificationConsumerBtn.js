import React from 'react'

const NotificationConsumerBtn = ({index, removeNotification})=>{
  const deleteHandler= (e)=>{
    e.preventDefault()
    console.log("i have")
    removeNotification(index)
  }

  return(
    <div>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  )
}

export default NotificationConsumerBtn