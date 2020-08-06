import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../../../Services/API';
import URL from '../../../Services/URL';


const BANK_URL =["", "money-partner-group2/add-money", "money-partner-group15/add-money" ]
export const getBankList = (callBack) => {
  const {accessToken} = JSON.parse(localStorage.getItem('tokens')) || "";
  return fetch(API.GET_BANK_LIST, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'x-access-token': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(res => {
      callBack(res.list);
    })
    .catch(error => {
      
      Swal.fire('Thông báo', error.msg, 'error');
    });
};

export const getOTP = (body, callBack) => {
  const {accessToken} = JSON.parse(localStorage.getItem('tokens')) || "";
  return fetch(API.GET_OTP, {
    method: 'POST', 
    body: JSON.stringify(body),
    headers:  {
      'Content-Type': 'application/json',
      'x-access-token': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(res => {
      console.log("otp", res)
    })
    .catch(error => {
      
      Swal.fire('Thông báo', error.msg, 'error');
    });
};

export const verify = (body) => {
  const {accessToken} = JSON.parse(localStorage.getItem('tokens')) || "";
  return fetch(API.VERIFY, {
    method: 'POST', 
    body: JSON.stringify(body),
    headers:  {
      'Content-Type': 'application/json',
      'x-access-token': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      
      Swal.fire('Thông báo', error.msg, 'error');
      return false;
    });
};
export const inPay = (body) => {
  const {accessToken} = JSON.parse(localStorage.getItem('tokens')) || "";
  return fetch(API.PAY_MONEY, {
    method: 'POST', 
    body: JSON.stringify(body),
    headers:  {
      'Content-Type': 'application/json',
      'x-access-token': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      
      Swal.fire('Thông báo', error.msg, 'error');
      return false;
    });
};
export const outerPay = (body) => {
  const {accessToken} = JSON.parse(localStorage.getItem('tokens')) || "";
  const url = BANK_URL[body.id_ngan_hang];
  return fetch(`${URL}/api/`+ url, {
    method: 'POST', 
    body: JSON.stringify(body),
    headers:  {
      'Content-Type': 'application/json',
      'x-access-token': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      
      Swal.fire('Thông báo', error.msg, 'error');
      return false;
    });
};

export const sendMoney = (body) => {
  const {accessToken} = JSON.parse(localStorage.getItem('tokens')) || "";
  return fetch(API.SEND_MONEY, {
    method: 'POST', 
    body: JSON.stringify(body),
    headers:  {
      'Content-Type': 'application/json',
      'x-access-token': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      
      Swal.fire('Thông báo', error.msg, 'error');
      return false;
    });
};
