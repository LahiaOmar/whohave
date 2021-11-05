import React from 'react'
import {
  AppBar,
  Button,
  Divider,
  Grid,
  Toolbar,
  Tooltip,
  Container,
  Typography
} from '@material-ui/core'

import ListOfResponse from '../ListOfResponse'
import UserInformations from '../UserInformations'
import UserCard from '../UserCard'
import { Route, useHistory } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SendIcon from '@material-ui/icons/Send';

import UserMenuList from '../UserMenuList'
import Message from '../Message'
import useSocket from '../useHooks/useSocket'
import { AlertContext } from '../../Context/AlertProvider'
import * as ALERT_TYPES from '../../Context/actions/AlertTypes'
import * as AUTH_ACTIONS from '../../Context/actions/AuthTypes'
import { AuthContext } from '../../Context/AuthProvider'
import dashboardAPI from '../../api/CoreAPI'
import Logo from '../Logo'
import Channel from '../Channel'

const UserDashboard = () => {
  const { authState: { userType, profile: { _id } }, authDispatch } = React.useContext(AuthContext)
  const { alertDispatch } = React.useContext(AlertContext)
  const [notification, socketLoading] = useSocket()
  const [responses, setResponses] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)
  const history = useHistory()

  /**
   * 
   * 
   * 
   */


  const fetchData = async () => {
    dashboardAPI.getUserResponses({
      userType, userId: _id
    })
      .then(res => {
        setResponses(res)
        setIsLoading(false)
      })
      .catch(err => {
        console.log("ex", err)
      })
  }

  const logout = async () => {
    dashboardAPI.logout()
      .then(res => {
        authDispatch(AUTH_ACTIONS.logout())
      })
      .catch(err => { console.log("logout err", err) })
  }

  const sendProduct = async (values) => {
    const { files, ...reqProduct } = values
    reqProduct.from = _id
    const formData = new FormData()
    const keys = Object.keys(reqProduct)
    keys.forEach(key => formData.append(key, reqProduct[key]))
    files.forEach(img => formData.append('files', img))

    dashboardAPI.sendProduct(formData)
      .then(res => {
        alertDispatch(ALERT_TYPES.sendProductSuccess())
        fetchData()
      })
      .catch(err => {
        alertDispatch(ALERT_TYPES.sendProductFailure())
      })
  }

  const deleteProduct = async (productId) => {
    dashboardAPI.deleteProduct({ productId })
      .then(res => {
        alertDispatch(ALERT_TYPES.deleteSuccess())
        fetchData()
      })
      .catch(err => {
        alertDispatch(ALERT_TYPES.deleteFailure())
      })
  }

  const deleteResponse = async (productId, storeId) => {
    dashboardAPI.deleteResponse({ productId, storeId })
      .then(res => {
        alertDispatch(ALERT_TYPES.deleteSuccess())
        fetchData()
      })
      .catch(err => {
        alertDispatch(ALERT_TYPES.deleteFailure())
      })

  }

  React.useEffect(() => {
    if (notification) {
      const { store, productId } = JSON.parse(notification)
      if (store && productId) {
        const newResponses = { ...responses }
        const index = newResponses.products.findIndex((product) => product._id === productId)
        if (index >= 0) {
          newResponses.stores[index].push(store)
          setResponses(newResponses)
        }
      }
    }
  }, [notification])

  React.useEffect(() => {
    document.title = "Dashboard"
    fetchData()
  }, [])

  if (socketLoading)
    return <p>dashboad loading</p>
  return (
    <>
      <Grid xs={12} item>
        <AppBar position="relative">
          <Container maxWidth="lg">
            <Toolbar className="dashboard-topbar" disableGutters>
              <Grid container item xs={4} justify="flex-start" >
                <Logo />
              </Grid>
              <Grid container item xs={8} justify="flex-end">
                <Tooltip title="Send Product" onClick={() => history.push('/dashboard/product')}>
                  <Button color="inherit">
                    <SendIcon />
                  </Button>
                </Tooltip>

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
      <Grid container item xs={12}>
        <Container maxWidth="lg">
          <Grid container justify="center" alignItems="center" direction="column" spacing={2}>
            <Route exact path="/dashboard/notifications">
              <Grid container spacing={2} item xs={12} sm={12} md={8}>
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
              <Grid item xs={12} sm={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography color="textPrimary" variant="h6">Products</Typography>
                    <Divider variant="middle" />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center" justify="center">
                      {
                        !isLoading
                        &&
                        responses.products.map(product => <UserCard product={product} showResponses={() => { }} />)
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Route>
            <Route exact path="/dashboard/profile">
              <Grid item xs={12} sm={8}>
                <UserInformations />
              </Grid>
            </Route>
            <Route exact path="/dashboard/product">
              <Grid item xs={12} sm={8}>
                <Message sendProduct={sendProduct} />
              </Grid>
            </Route>
          </Grid>
        </Container>
      </Grid>
    </>
  )
}

export default UserDashboard