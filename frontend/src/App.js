import React from 'react';
import NavBar from './components/NavBar'
import HeadLine from './components/HeadLIne'
import Dashboard from './components/Dashboard'
import LoginContext from './components/ContextAuth'
import ProtectedRoute from './components/ProtectedRoute'

import {Grid} from '@material-ui/core'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'

import './styles/style.css'

function App() {
  const [context, setContext] = React.useState({
    isLoged : false,
    type : undefined,
    userData : {},
    redirect : {},
  })
  console.log("new state APP user ", context)
  return (
    <Grid container className="App">
      <LoginContext.Provider value={{...context, setContext}}>
        <Router>
          {
            (context.redirect.ok) 
            ? (<Redirect to={context.redirect.to}/>)
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
