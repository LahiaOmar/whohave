import React from 'react'
import { Button, Hidden, List, ListItem, ListItemText, makeStyles } from '@material-ui/core'

import LogIn from '../LogIn'
import SignUp from '../SignUp'
import MyModal from '../Mymodal'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: '100%',
  },
  links: {
    width: '100%',
    height: '100%',
    padding: '10px',
    display: 'block',
    textAlign: 'center'
  },
  gridBasis: {
    flexBasis: 'auto'
  }
}))

const UserNotLogged = ({ modalState, setModalHandler }) => {
  const classes = useStyles()

  return (
    <>
      <MyModal
        open={modalState.signUpOpen}
        handleClose={() => setModalHandler({ bool: false, who: 'signUpOpen' })}
        handleOpen={() => setModalHandler({ bool: true, who: 'signUpOpen' })}
      >
        <SignUp />
      </MyModal>
      <MyModal
        open={modalState.loginOpen}
        handleClose={() => setModalHandler({ bool: false, who: 'loginOpen' })}
        handleOpen={() => setModalHandler({ bool: true, who: 'loginOpen' })}
      >
        <LogIn />
      </MyModal>
      <Hidden xsDown>
        <div className="auth-btn">
          <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => setModalHandler({ bool: true, who: 'signUpOpen' })}>
            Sign Up
          </Button>
          <Button variant="outlined" style={{ marginLeft: '10px' }} onClick={() => setModalHandler({ bool: true, who: 'loginOpen' })}>
            Log In
        </Button>
        </div>
      </Hidden>
      <Hidden smUp>
        <List component="nav">
          <ListItem button className={classes.links} onClick={() => setModalHandler({ bool: true, who: 'signUpOpen' })}>
            <ListItemText primary="Sign up" />
          </ListItem>
          <ListItem button className={classes.links} onClick={() => setModalHandler({ bool: true, who: 'loginOpen' })}>
            <ListItemText primary="Log in" />
          </ListItem>
        </List>
      </Hidden>
    </>
  )
}

export default UserNotLogged