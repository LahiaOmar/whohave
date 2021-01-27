import React from 'react';
import NavBar from './components/NavBar'
import HeadLine from './components/HeadLIne'
import Dashboard from './components/Dashboard'
import LoginContext from './components/ContextAuth'
import ProtectedRoute from './components/ProtectedRoute'
import VerificationToken from './components/VerificationToken'
import { Grid } from '@material-ui/core'
import Axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

import './styles/style.css'

function App() {
  const history = useHistory()
  const redirectTo = (path) => {
    history.push(path)
  }
  const logout = async () => {
    try {
      const config = {
        url: '/api/user/auth/logout',
        method: 'POST'
      }
      const response = await Axios(config)
      setContext({
        isLoged: false,
        type: undefined,
        userData: {},
        redirect: [],
        logout: logout,
        redirectTo: redirectTo
      })
    }
    catch (e) {
      // display error. 
    }
  }


  const [context, setContext] = React.useState({
    isLoged: false,
    type: undefined,
    userData: {},
    redirect: [],
    logout: logout,
    redirectTo: redirectTo
  })


  return (
    <Grid
      container
      className="app-container"
      xs={12}
    >
      <LoginContext.Provider value={{ ...context, setContext }}>
        <VerificationToken>
          <Switch>
            <Route path="/" exact>
              <NavBar />
              <HeadLine />
            </Route>
            <ProtectedRoute path="/dashboard/">
              <Dashboard />
            </ProtectedRoute>
          </Switch>
        </VerificationToken>
      </LoginContext.Provider>
    </Grid>
  );
}

export default App;
