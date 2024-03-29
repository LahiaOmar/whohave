import React from 'react'
import {
  AppBar,
  Button,
  Divider,
  Grid,
  Toolbar,
  Tooltip,
} from '@material-ui/core'

import ListOfResponse from '../ListOfResponse'
import UserInformations from '../UserInformations'
import UserCard from '../UserCard'
import { Route } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import UserMenuList from '../UserMenuList'
import Message from '../Message'
import useSocket from '../useHooks/useSocket'
import { AlertContext } from '../../Context/AlertProvider'
import * as ALERT_TYPES from '../../Context/actions/AlertTypes'
import * as AUTH_ACTIONS from '../../Context/actions/AuthTypes'
import { AuthContext } from '../../Context/AuthProvider'
import dashboardAPI from '../../api/CoreAPI'

const UserDashboard = () => {
  const { authState: { userType, profile: { _id } }, authDispatch } = React.useContext(AuthContext)
  const { alertDispatch } = React.useContext(AlertContext)
  const [notification, socketLoading] = useSocket()
  const [responses, setResponses] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

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
          <Toolbar className="dashboard-topbar" disableGutters>
            <Tooltip title="LogOut" onClick={() => logout()}>
              <Button color="inherit">
                <ExitToAppIcon />
              </Button>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid className="dashboard-mid" xs={12} container item>
        <Grid item className="dashboard-menu" xs={2}>
          <UserCard />
          <Divider />
          <UserMenuList />
        </Grid>
        <Grid item xs={10} className="dashboard-notifications">
          <Route exact path="/dashboard/notifications">
            {
              !isLoading && <ListOfResponse
                responses={responses}
                notification={notification}
                actions={{ deleteProduct, deleteResponse }} />
            }
          </Route>
          <Route exact path="/dashboard/profile">
            <UserInformations />
          </Route>
          <Route exact path="/dashboard/product">
            <Message sendProduct={sendProduct} />
          </Route>
        </Grid>
      </Grid>
    </>
  )
}

export default UserDashboard