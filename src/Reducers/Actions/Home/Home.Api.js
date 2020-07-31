import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../../../Services/API';

const {accessToken} = JSON.parse(localStorage.getItem('tokens')) || "";
export const getInfo = (body, callBack) => {
  return fetch(API.GET_USER_ACCOUNT, {
    method: 'POST',
    body:JSON.stringify({'stk_thanh_toan': body }),
    headers:{
      'Content-Type': 'application/json',
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
