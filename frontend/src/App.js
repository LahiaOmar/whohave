import React from 'react';
import NavBar from './components/NavBar'
import HeadLine from './components/HeadLIne'
import Dashboard from './components/Dashboard'
import LoginContext from './components/ContextAuth'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './styles/style.css'

function App() {
  const [isLoged, setIsLoged] = React.useState(true)
  const [connectedUser, setConnectedUSer] = React.useState('who')

  return (
    <div className="App">
      <LoginContext.Provider value={{isLoged, setIsLoged, connectedUser}}>
        <Router>
          <NavBar />
          <Switch>
            <Route path="/" exact>
              <HeadLine />
            </Route>
            {/* dashborad path sould be protected. */}
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </Router>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
