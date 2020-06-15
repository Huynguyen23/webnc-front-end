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
import { Transfer } from '../BankTransfer';
import { OTP } from '../OTP';
import { ChangePass } from '../ChangePass';
import { InterBankTransfer } from '../InterBankTransfer';
import { BankTransfer } from '../BankTransfer';
import { DebtReminder } from '../DebtReminder';
import { CreateAcct } from '../CreateAcct';
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
      console.log("error");
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
          <Route exact path="/login">
            {!authTokens ? <Login /> : <Redirect to="/" />}
          </Route>
         <PrivateRoute 
            exact 
            path="/"
            render={() => <BankLayout Child={<Dashboard />} />}
          />
          <PrivateRoute
            exact
            path="/receiver-list"
            render={() => <BankLayout Child={<ReceiverList />} />}
          />
          <PrivateRoute
            exact
            path="/interbank-transfer"
            render={() => <BankLayout Child={<InterBankTransfer />} />}
          />
          <PrivateRoute
            exact
            path="/bank-transfer"
            render={() => <BankLayout Child={<BankTransfer />} />}
          />
           <PrivateRoute
            exact
            path="/otp"
            render={() => <OTP/>}
          />

          <PrivateRoute
            exact
            path="/change-password"
            render={() => <ChangePass/>}
          />
          <PrivateRoute 
            exact 
            path="/debt-reminder"
            render={() => <BankLayout Child={<DebtReminder />} />}
          />

          <PrivateRoute 
            exact 
            path="/create-acct"
            render={() => <BankLayout Child={<CreateAcct />} />}
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
