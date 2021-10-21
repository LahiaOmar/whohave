import React from 'react'
import {
  AppBar,
  Button,
  Divider,
  Grid,
  Toolbar,
  Tooltip,
  Typography,
  makeStyles,
  Container
} from '@material-ui/core'
import { Route, useHistory } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

import ListOfProduct from '../ListOfProduct'
import StoreInformations from '../StoreInformations'
import useSocket from '../useHooks/useSocket'
import { AlertContext } from '../../Context/AlertProvider'
import { AuthContext } from '../../Context/AuthProvider'
import * as ACTION_TYPES from '../../Context/actions/AlertTypes'
import * as AUTH_ACTIONS from '../../Context/actions/AuthTypes'
import dashboardAPI from '../../api/CoreAPI'
import Channel from '../Channel';
import Logo from '../Logo';

const useStyles = makeStyles((theme) => ({
  channels: {
    title: {
      color: theme.palette.text.secondary
    }
  }
}))

const StoreDashboard = () => {
  const { authState: { profile: { _id }, userType }, authDispatch } = React.useContext(AuthContext)
  const { alertDispatch } = React.useContext(AlertContext)
  const [notification, socketLoading] = useSocket()
  const [products, setProducts] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const history = useHistory()
  const classes = useStyles()

  const fetchData = () => {
    const data = {
      userType,
      userId: _id
    }
    dashboardAPI.getStoreProducts(data)
      .then(res => {
        console.log("res ", res)
        setProducts(res.products)
        setIsLoading(false)
      })
      .catch(err => { console.log("err store fetch data", err) })
  }

  const logout = () => {
    dashboardAPI.logout()
      .then(res => {
        authDispatch(AUTH_ACTIONS.logout())
      })
      .catch(err => { console.log("err ", err) })
  }

  const feedback = (productId, userId, ok) => {
    const content = {
      productId,
      ok
    }
    const queryData = {
      userId,
      storeId: _id
    }

    const data = {
      content,
      queryData
    }
    dashboardAPI.storeFeedback(data)
      .then(res => {
        alertDispatch(ACTION_TYPES.feedbackSuccess())
        fetchData()
      })
      .catch(err => {
        alertDispatch(ACTION_TYPES.feedbackFailure())
      })
  }

  React.useEffect(() => {
    if (notification) {
      const product = JSON.parse(notification)
      setProducts(products => products.concat(product))
    }
  }, [notification])

  React.useEffect(() => {
    document.title = "Dashboard"
    fetchData()
  }, [])


  if (socketLoading)
    return <p>dashboard loading</p>

  return (
    <>
      <Grid item xs={12}>
        <AppBar position="relative">
          <Container maxWidth="lg">
            <Toolbar className="dashboard-topbar" disableGutters>
              <Grid container item xs={4} justify="flex-start" >
                <Logo />
              </Grid>
              <Grid container item xs={8} justify="flex-end">
                <Tooltip title="Notification" onClick={() => history.push('/dashboard/notifications')}>
                  <Button color="inherit">
                    <NotificationsIcon />
                  </Button>
                </Tooltip>

                <Tooltip title="Profile" onClick={() => history.push('/dashboard/profile')}>
                  <Button color="inherit">
                    <AccountCircleIcon />
                  </Button>
                </Tooltip>

                <Tooltip title="LogOut" onClick={() => logout()}>
                  <Button color="inherit">
                    <ExitToAppIcon />
                  </Button>
                </Tooltip>
              </Grid>
            </Toolbar>
          </Container>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="lg">
          <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
            <Route exact path="/dashboard/notifications">
              <Grid item xs={12} sm={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography color="textPrimary" variant="h6">Channels</Typography>
                    <Divider variant="middle" />
                  </Grid>
                  <Grid container item xs={12} justify="center" spacing={2}>
                    {
                      new Array(7).fill(2).map(_ => <Grid item> <Channel /></Grid>)
                    }
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <div>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography color="textPrimary" variant="h6">Products</Typography>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={12}>
                      <div>
                        <Grid container spacing={2} alignItems="center" justify="center">
                          {
                            !isLoading && <ListOfProduct
                              products={products}
                              feedback={feedback} />
                          }
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Route>
            <Route exact path="/dashboard/profile">
              <Grid item xs={12} sm={8}>
                <StoreInformations />
              </Grid>
            </Route>
          </Grid>
        </Container>
      </Grid>
    </>
  )
}

export default StoreDashboard