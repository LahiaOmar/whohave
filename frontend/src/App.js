import React from 'react';
import NavBar from './components/NavBar'
import HeadLine from './components/HeadLIne'
import Dashboard from './components/Dashboard'
import LoginContext from './components/ContextAuth'
import ProtectedRoute from './components/ProtectedRoute'

import {BrowserRouter as Router, Route, Switch, Redirect, useHistory} from 'react-router-dom'
import {Grid} from '@material-ui/core'
import './styles/style.css'

function App() {
  const [user, setUser] = React.useState({
    isLoged : false,
    type : undefined,
    userData : {},
    redirect : {},
  })
  return (
    <Grid container className="App">
      <LoginContext.Provider value={{user, setUser}}>
        <Router>
          {
            (user.redirect.ok) 
            ? (<Redirect to={user.redirect.to}/>)
            : null
          }
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <HeadLine />
            </Route>
            {/* dashborad path sould be protected. */}
            <ProtectedRoute exact path="/dashboard">
              <Dashboard />
            </ProtectedRoute>
            <ProtectedRoute exact path="/dashboard/information">
              <div>user information</div>
            </ProtectedRoute>
          </Switch>
        </Router>
      </LoginContext.Provider>
    </Grid>
  );
}

export default App;
