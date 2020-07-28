/* eslint-disable no-console */
import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../Services/API';

const RECEIVE_HISTORY = 'RECEIVE_HISTORY';
const PAY_HISTORY = 'PAY_HISTORY';
const DEBT_HISTORY = 'DEBT_HISTORY';

// action
const {accessToken} = JSON.parse(localStorage.getItem('tokens'))
export const getReceiveHistoryList = body => dispatch => {
  return (
    fetch(API.RECEIVE_HISTORY, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'x-access-token': `${accessToken}`
      }
    })
      .then(response => response.json())
      .then(res => {
        dispatch({ type: RECEIVE_HISTORY, payload: res });
      })
      .catch(() => {
        Swal.fire('Lỗi', 'Lỗi mạng', 'error');
        return false;
      })
  );
};

export const getPayHistoryList = body => dispatch => {
  return (
    fetch(API.PAY_HISTORY, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'x-access-token': `${accessToken}`
      }
    })
      .then(response => response.json())
      .then(res => {
        dispatch({ type: PAY_HISTORY, payload: res });
      })
      .catch(() => {
        Swal.fire('Lỗi', 'Lỗi mạng', 'error');
        return false;
      })
  );
};

export const getDebtHistoryList = body => dispatch => {
  return (
    fetch(API.DEBT_HISTORY, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'x-access-token': `${accessToken}`
      }
    })
      .then(response => response.json())
      .then(res => {
        dispatch({ type: DEBT_HISTORY, payload: res });
      })
      .catch(() => {
        Swal.fire('Lỗi', 'Lỗi mạng', 'error');
        return false;
      })
  );
};

export const receiveHistoryList = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_HISTORY:
      return action.payload.data;
    default:
      return state;
    }
};

export const payHistoryList = (state = [], action) => {
  switch (action.type) {
    case PAY_HISTORY:
      return action.payload.data;
    default:
      return state;
    }
};

export const debtHistoryList = (state = [], action) => {
  switch (action.type) {
    case DEBT_HISTORY:
      return action.payload.data;
    default:
      return state;
    }
};