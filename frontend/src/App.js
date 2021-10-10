import React from 'react'
import { Grid } from '@material-ui/core'
import { Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core'

import './styles/style.css'

import NavBar from './components/NavBar'
import HeadLine from './components/HeadLine'
import ProtectedRoute from './components/ProtectedRoute'
import AlertMessage from './components/AlertMessage'
import AlertProvider from './Context/AlertProvider'
import AuthProvider from './Context/AuthProvider'
import Dashboard from './components/Dashboard'
import NotFound from './components/NotFound'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100]
  }
}))

function App() {
  const classes = useStyles()

  return (
    <Grid
      className="app-container" className={classes.root}>
      <AuthProvider>
        <AlertProvider>
          <AlertMessage />
          <Switch>
            <Route path="/" exact>
              <NavBar />
              <HeadLine />
            </Route>
            <ProtectedRoute path="/dashboard/">
              <Dashboard />
            </ProtectedRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </AlertProvider>
      </AuthProvider>
    </Grid>
  );
}

export default App;
