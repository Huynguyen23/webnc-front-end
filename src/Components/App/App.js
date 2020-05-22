/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Login } from '../Login';
import { BankLayout } from '../BankLayout';
import { ReceiverList } from '../ReceiverList';
import { PrivateRoute } from '../Routes/PrivateRoute';
import { AuthContext } from '../Routes/Context';
import './App.css';
import { Dashboard } from '../Dashboard';

function App() {
  const [authTokens, setAuthTokens] = useState('');
  if (localStorage.getItem('tokens') && authTokens === '') {
    try {
      setAuthTokens(JSON.parse(localStorage.getItem('tokens')));
    } catch {
      console.log();
    }
  }
  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Switch>
        <Route 
        exact 
        path="/dashboard"
        render={() => <BankLayout Child={<Dashboard />} />}
        >
        </Route>
          {/* <Route exact path="/login">
            {!true ? <Login /> : <Redirect to="/" />}
          </Route> */}

          <PrivateRoute
            exact
            path="/receiver-list"
            render={() => <BankLayout Child={<ReceiverList />} />}
          />
        </Switch>
      </Router>

      
    </AuthContext.Provider>
  );
}

export default App;
