import React from 'react'
import Axios from 'axios'
import { v4 as uui } from 'uuid'
import { Grid } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

import './styles/style.css'

import NavBar from './components/NavBar'
import HeadLine from './components/HeadLIne'
import ProtectedRoute from './components/ProtectedRoute'
import AlertMessage from './components/AlertMessage'
import AlertProvider from './Context/AlertProvider'
import AuthProvider from './Context/AuthProvider'
import Dashboard from './components/Dashboard'

function App() {

  return (
    <Grid
      container
      className="app-container"
      xs={12}>
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
          </Switch>
        </AlertProvider>
      </AuthProvider>
    </Grid>
  );
}

export default App;
