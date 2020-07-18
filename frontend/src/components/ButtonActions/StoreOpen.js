import React from 'react'
import Switch from '@material-ui/core/Switch';

function StoreOpen(props){
  const OPEN = `OPEN`
  const CLOSE = `CLOSE`
  const [state, setState] = React.useState({
    checked : true,
    msg: OPEN
  })
  
  const handleChange = (event)=>{
    const check = event.target.checked 
    const msg = check ? OPEN : CLOSE
    setState({
      checked : check,
      msg : msg
    })
  }

  return (
    <div>
      <Switch 
        checked={state.checked}
        onChange={handleChange}
        name="timeOpening"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
      <p className="open-time">{state.msg}</p>
    </div>
  )
}

export default StoreOpen