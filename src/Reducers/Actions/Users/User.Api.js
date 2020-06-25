import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../../../Services/API';

export const login = (username, password, callBack) => {
  return fetch(API.LOGIN, {
    method: 'POST',
    body:`stk_thanh_toan=${username}&ma_pin=${password}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.json())
    .then(res => {
      console.log("res",res);
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
  console.log("getUserInfo", body);
  return fetch(API.GET_USER_INFO, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
    .then(res => {
      console.log("GET_USER_INFO",res);
      if (res.data) {
        callBack(res.data);
        return res.data;
      } else {
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
  console.log("addUser", body);
  return fetch(API.ADD_USER, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
    .then(res => {
      console.log("ADD_USER",res);
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
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
    .then(res => {
      console.log("CHANGE_PASS",res);
      return res;
    })
    .catch(error => {
      Swal.fire('Thông báo', error.message, 'error');
    });
  
}