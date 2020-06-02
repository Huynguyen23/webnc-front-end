import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../../../Services/API';

export const getInfo = (body, callBack) => {
  console.log("body",body);
  return fetch(API.GET_USER_ACCOUNT, {
    method: 'POST',
    body:JSON.stringify({'stk_thanh_toan': body }),
    headers:{
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(res => {
      callBack(res.list);
    })
    .catch(error => {
      
      Swal.fire('Thông báo', error.message, 'error');
    });
};
