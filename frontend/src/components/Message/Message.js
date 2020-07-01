import React from 'react'
import MyModal from '../Mymodal'

function Message(props){
  return (
    <div>
      <MyModal btnTitle="Send Product">
        <input type="text" />
      </MyModal>
    </div>
  )
}

export default Message