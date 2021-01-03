import React from 'react';
import NavBar from './components/NavBar'
import HeadLine from './components/HeadLIne'
import Dashboard from './components/Dashboard'
import LoginContext from './components/ContextAuth'
import ProtectedRoute from './components/ProtectedRoute'

import Axios from 'axios'
import { Grid } from '@material-ui/core'
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

import './styles/style.css'

function App() {
  const history = useHistory()
  const [context, setContext] = React.useState({
    isLoged: false,
    type: undefined,
    userData: {},
    redirect: [],
  })
  React.useState(() => {
    const checkIsLoged = async () => {
      try {
        const currentAlias = window.location.href.split("3000")[1]
        const userType = localStorage.getItem("userType") === "true" ? true : false
        const { data } = await Axios.post('/api/user/verify', { userType: userType, userId: context.userData._id })
        if (data.valideToken) {
          setContext({
            ...context,
            isLoged: true,
            userData: data.userData,
            type: userType,
            redirect: currentAlias
          })
        }
      }
      catch (e) {
        console.log("error ", e)
      }
    }
    checkIsLoged()
  }, [])

  return (
    <Grid
      container
      className="app-container"
      xs={12}
    >
      <LoginContext.Provider value={{ ...context, setContext }}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <NavBar />
              <HeadLine />
            </Route>
            {/* should be protecetd */}
            <ProtectedRoute path="/dashboard/*" to="/dashboard/notifications">
              <Dashboard />
            </ProtectedRoute>
          </Switch>
        </Router>
      </LoginContext.Provider>
    </Grid>
  );
}

export default App;
