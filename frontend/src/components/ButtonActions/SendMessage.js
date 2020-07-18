import React from 'react'
import Message from '../Message'
import {Fab} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

function SendMessage({onClick}){
  return (
    <Fab color="primary" onClick={onClick}>
      <ShoppingCartIcon color="inherit"/>
    </Fab>   
  )
}

export default SendMessage