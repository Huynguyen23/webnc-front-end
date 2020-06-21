/* eslint-disable no-console */
import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../Services/API';

const REMINDER_LIST = 'REMINDER_LIST';
const ADD_REMINDER = 'ADD_REMINDER';
const DELETE_REMINDER = 'DELETE_REMINDER';
const UPDATE_REMINDER = 'UPDATE_REMINDER';
// action

export const getReminderList = body => dispatch => {
  return (
    fetch(API.REMINDER_LIST, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then(response => response.json())
      // return getData()
      .then(res => {
        // if (res === true) {
          console.log("com", res);
        dispatch({ type: REMINDER_LIST, payload: res });
        // }
      })
      .catch(() => {
        Swal.fire('Lỗi', 'Lỗi mạng', 'error');
        return false;
      })
  );
};

export const addREMINDER = body => dispatch => {
  console.log("banke", body);
  return (
    fetch(API.ADD_REMINDER, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then(response => response.json())
      .then(res => {
        if (res.status > 0) {
          dispatch({ type: ADD_REMINDER, payload: body });
        }
        return res;
      })
  );
};

export const updateReminder = body => dispatch => {
  console.log("updateREMINDER", body);
  return (
    fetch(API.UPDATE_REMINDER, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res.status > 0) {
          dispatch({ type: UPDATE_REMINDER, payload: body });
        }
        return res;
      })
  );
};

export const deleteReminder = body => dispatch => {
  return fetch(API.DELETE_REMINDER, {
    method: 'PUT',
    body:JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res === true) {
        dispatch({ type: DELETE_REMINDER, payload: body.stk_nguoi_nhan });
      }
    })
    .finally(() => {});
};
// reducer
export const reminderList = (state = [], action) => {
  switch (action.type) {
    case REMINDER_LIST:
      return action.payload.list;
    case ADD_REMINDER:
      return [...state, action.payload];
    case DELETE_REMINDER:
      return state.filter(item => item.stk_nguoi_nhan !== action.payload);
    case UPDATE_REMINDER: {
      const oldValue= state.filter(item => item.stk_nguoi_nhan === action.payload.stk_nguoi_nhan)[0];
      const newState = state.filter(item => item.stk_nguoi_nhan !== action.payload.stk_nguoi_nhan);
      return [...newState, {stk_nguoi_nhan:action.payload.stk_nguoi_nhan,ten_goi_nho:action.payload.ten, id_ngan_hang: oldValue.id_ngan_hang}];
    }
    default:
      return state;
  }
};
