import React from 'react'
import { Button, Avatar, makeStyles, Hidden, List, ListItem, ListItemText } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
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

const UserLogged = () => {
  const [openMenu, setOpenMenu] = React.useState(false)
  const classes = useStyles()
  return (
    <>
      <Hidden xsDown>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          endIcon={<Avatar> O.L </Avatar>}
          onClick={() => setOpenMenu(!openMenu)}>
          Omar lahia
        </Button>
        {
          openMenu &&
          <List component="nav" style={{ position: 'absolute', zIndex: '1000' }}>
            <ListItem className={classes.links} button onClick={() => console.log("click")}>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem className={classes.links} button onClick={() => console.log("click 2")} >
              <ListItemText primary="logout" />
            </ListItem>
          </List>

        }
      </Hidden>
      <Hidden smUp>
        <List component="nav">
          <ListItem button className={classes.links} onClick={() => console.log("click")}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button className={classes.links} onClick={() => console.log("click 2")} >
            <ListItemText primary="logout" />
          </ListItem>
        </List>
      </Hidden>
    </>
  )
}

export default UserLogged