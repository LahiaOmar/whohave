import React from 'react'
import {
  AppBar,
  Button,
  Divider,
  Grid,
  Toolbar,
  Link as LinkUi,
  Badge,
  Tooltip,
} from '@material-ui/core'
import ListOfProduct from '../ListOfProduct'
import StoreInformations from '../StoreInformations'
import UserCard from '../UserCard'
import Axios from 'axios'
import { Route, Link } from 'react-router-dom'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import StoreMenuList from '../StoreMenuList'
import useSocket from '../useHooks/useSocket'
import { AlertContext } from '../../Context/AlertProvider'
import { AuthContext } from '../../Context/AuthProvider'
import * as ACTION_TYPES from '../../Context/actions/AlertTypes'
import * as AUTH_ACTIONS from '../../Context/actions/AuthTypes'
import dashboardAPI from './dashboardAPI'

const StoreDashboard = () => {
  const { authState: { profile: { _id }, userType }, authDispatch } = React.useContext(AuthContext)
  const { alertDispatch } = React.useContext(AlertContext)
  const [notification, socketLoading] = useSocket()
  const [products, setProducts] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

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
    <Grid className="dashboard-container" item xs={12} spacing={4}>
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
          <StoreMenuList />
        </Grid>
        <Grid item xs={10} className="dashboard-notifications">
          <Route exact path="/dashboard/notifications">
            {
              !isLoading && <ListOfProduct
                products={products}
                feedback={feedback} />
            }
          </Route>
          <Route exact path="/dashboard/profile">
            <StoreInformations />
          </Route>
        </Grid>
      </Grid>
    </Grid >
  )
}

export default StoreDashboard