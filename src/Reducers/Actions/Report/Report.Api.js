import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../../../Services/API';

const {accessToken} = JSON.parse(localStorage.getItem('tokens')) || "";
export const getReportList = () => {
  return (
    fetch(API.REPORT_LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'x-access-token': `${accessToken}`
      }
    })
      .then(response => response.json())

      .then(res => {
        return res;
      })
      .catch(() => {
        Swal.fire('Lỗi', 'Lỗi mạng', 'error');
        return false;
      })
  );
};
export const getBankList = () => {
  return (
    fetch(API.GET_BANK_LIST, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'x-access-token': `${accessToken}`
      }
    })
      .then(response => response.json())

      .then(res => {
        return res;
      })
      .catch(() => {
        Swal.fire('Lỗi', 'Lỗi mạng', 'error');
        return false;
      })
  );
};
