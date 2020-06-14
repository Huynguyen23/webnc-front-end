import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../../../Services/API';

export const getBankList = (callBack) => {
  return fetch(API.GET_BANK_LIST, {
    method: 'GET'
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
  return fetch(API.GET_OTP, {
    method: 'POST', 
    body: JSON.stringify(body),
    headers:  {
      'Content-Type': 'application/json'
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
  return fetch(API.VERIFY, {
    method: 'POST', 
    body: JSON.stringify(body),
    headers:  {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(res => {
      console.log("otp", res)
      return res;
    })
    .catch(error => {
      
      Swal.fire('Thông báo', error.msg, 'error');
      return false;
    });
};