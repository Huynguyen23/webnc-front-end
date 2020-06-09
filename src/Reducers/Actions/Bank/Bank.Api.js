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
