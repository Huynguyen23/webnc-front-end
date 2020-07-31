import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import {message} from 'antd';
import API from '../../../Services/API';
import URL from '../../../Services/URL';

const {accessToken} = JSON.parse(localStorage.getItem('tokens'))|| "";
const BANK_INFO_URL = ["user/info", "money-partner-group2/info", "money-partner-group15/info"]
export const login = (username, password, callBack) => {
  return fetch(API.LOGIN, {
    method: 'POST',
    body:`stk_thanh_toan=${username}&ma_pin=${password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-access-token': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.accessToken) {
        callBack(res);
      } else {
        callBack(false);
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};

export const getUserInfo = (body, callBack) => {
  const url = BANK_INFO_URL[body.id_ngan_hang || 0]
  return fetch(`${URL}/api/`+ url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${accessToken}`
    }
  })
  .then(response => response.json())
    .then(res => {
      if (res.data) {
        if(body.id_ngan_hang){
          res.data = {
            ten_nguoi_nhan: res.data.ten
          }
          callBack(res.data);
        } else {
          callBack(res.data);
        }
        return res.data;
      } else {
        message.error('Không tìm thấy thông tin');
        callBack([]);
        return false;
      }
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
      callBack(false);
    });
};

export const addUser = (body) => {
  return fetch(API.ADD_USER, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${accessToken}`
    }
  })
  .then(response => response.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
    });
};

export const changePass = body =>{
  return fetch(API.CHANGE_PASS, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${accessToken}`
    }
  })
  .then(response => response.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
    });
  
}

export const resetPass = body =>{
  return fetch(API.FORGOT_PASS, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${accessToken}`
    }
  })
  .then(response => response.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
    });
}

export const changeAccessToken = body =>{
  return fetch(API.GET_NEW_TOKEN, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': `${accessToken}`
    }
  })
    .then(response => response.json())
    .then(res => {
      return res;
    })
    .catch(error => {
      
    });
  
}