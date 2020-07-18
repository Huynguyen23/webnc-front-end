/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { Login } from '../Login';
import { BankLayout } from '../BankLayout';
import { ReceiverList } from '../ReceiverList';
import socketIOClient from "socket.io-client";
import { notification } from 'antd';
import decode from 'jwt-decode';
import { ChangePass } from '../ChangePass';
import { InterBankTransfer } from '../InterBankTransfer';
import { BankTransfer } from '../BankTransfer';
import { DebtReminder } from '../DebtReminder';
import { CreateAcct } from '../CreateAcct';
import { History } from '../History';
import { PayMoney } from '../PayMoney';

import { PrivateRoute } from '../Routes/PrivateRoute';
import { AuthContext, SocketContext } from '../Routes/Context';
import './App.css';
import { Dashboard } from '../Dashboard';
import { EmployeeManagement } from '../EmployeeManagement';
import { ReportManagement } from '../ReportManagement';
import { ForgotPass } from '../ForgotPass';
import {changeAccessToken} from '../../Reducers/Actions/Users'
import Swal from 'sweetalert2';
const ENDPOINT = "http://localhost:3000";

function App() {
  const [authTokens, setAuthTokens] = useState('');
  const [socket, setSocket] = useState(null);

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
  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    const { exp } = decode(tokens.accessToken);
    if (exp < new Date().getTime() / 1000) {
      changeAccessToken({accessToken:tokens.accessToken, refreshToken: tokens.refreshToken}).then(res=>{
        if (res){
        tokens.accessToken = res.accessToken;
        setTokens(tokens);
        }else {
          Swal.fire("Lỗi", "Mất kết nối mạng", "error");
        }
      });
    } else {
      
      // const time = Number.parseInt(exp*60000 - new Date().getTime());
      const time = Number.parseInt(exp - new Date().getTime() / 1000)*1000;
      setTimeout(() => {
        changeAccessToken({accessToken:tokens.accessToken, refreshToken: tokens.refreshToken}).then(res=>{
          tokens.accessToken = res.accessToken;
          setTokens(tokens);
        });
        
      }, time);
    }
  }, []);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setSocket(socket);
    if(authTokens){
      if (socket) {
        socket.emit("stkTT", JSON.parse(localStorage.getItem("tokens")).stkThanhToan);
        // socket.on("notification", data => {
        //   console.log(data);
        // });
        // socket.on('debt', data =>{ // co nguoi nhac no minh
        //   console.log('debt: ', data);
        // });

        // socket.on('deleteDebt0', data =>{ // no tu huy nhac no cua no rồi
        //   console.log('debt: nguoi ta tu huy nhac no cua nguoi ta: ',data);
        // });

        // socket.on('deleteDebt1', data =>{ // nó dám hủy nhắc nợ của mình !!!
        //   console.log('nguoi ta huy nhac no cua minh: ',data);
        // });

        // socket.on('payDebt', data=>{ // bạn hiền đã thanh toán nhắc nợ cho mình r nè
        //   console.log('co nguoi thanh toan no cho ban: ', data);
        // });

        // socket.on('receiveMoney', data=>{ // co nguoi chuyen tien cho minh
        //   console.log('co nguoi chuyen tien: ', data);
        // });

        // socket.on('receiveMoneyEmployee', data=>{ // tự nạp tiền vào tài khoản bằng nhân viên của ngân hàng
        //   console.log('ngan hang da nap tien cho ban: ', data);
        // });
        // socket.on('notification', data=>{ // thông báo khi ko online
        //   console.log('notification: ', data);
        // });
      }
    }
    return () => socket.disconnect();
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <SocketContext.Provider value={socket}>
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
           {/* <PrivateRoute
            exact
            path="/otp"
            render={() => <OTP/>}
          /> */}

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
          <PrivateRoute 
            exact 
            path="/pay-money"
            render={() => <BankLayout Child={<PayMoney />} />}
          />
          <PrivateRoute 
            exact 
            path="/history"
            render={() => <BankLayout Child={<History />} />}
          />
          <PrivateRoute 
            exact 
            path="/employee-management"
            render={() => <BankLayout Child={<EmployeeManagement />} />}
          />
          <PrivateRoute 
            exact 
            path="/report"
            render={() => <BankLayout Child={<ReportManagement />} />}
          />
           <Route 
            exact 
            path="/forgot-password"
            render={() => <ForgotPass/>}
          />
        </Switch>
      </Router>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
