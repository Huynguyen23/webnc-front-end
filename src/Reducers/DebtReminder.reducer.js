/* eslint-disable no-console */
import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../Services/API';

const RECEIVE_LIST = 'RECEIVE_LIST';
const SEND_LIST = 'SEND_LIST';
const ADD_REMINDER = 'ADD_REMINDER';
const PAY_DEBT = 'PAY_DEBT';
const DELETE_RECIEVER_REMINDER = 'DELETE_RECIEVER_REMINDER';
const DELETE_SEND_REMINDER = 'DELETE_SEND_REMINDER';
const UPDATE_REMINDER = 'UPDATE_REMINDER';
// action

export const getReceiveList = body => dispatch => {
  return (
    fetch(API.RECEIVE_LIST, {
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
          console.log("RECEIVE_LIST", res);
        dispatch({ type: RECEIVE_LIST, payload: res });
        // }
      })
      .catch(() => {
        Swal.fire('Lỗi', 'Lỗi mạng', 'error');
        return false;
      })
  );
};

export const getSendList = body => dispatch => {
  return (
    fetch(API.SEND_LIST, {
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
          console.log("SEND_LIST", res);
        dispatch({ type: SEND_LIST, payload: res });
        // }
      })
      .catch(() => {
        Swal.fire('Lỗi', 'Lỗi mạng', 'error');
        return false;
      })
  );
};

export const addReminder = body => dispatch => {
  console.log("add", body)
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
    method: 'POST',
    body:JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (body.nguoi_xoa === 1) {
        
        dispatch({ type: DELETE_RECIEVER_REMINDER, payload: body.stk_nguoi_nhan });
        return res;
      } else {
        console.log("stk_nguoi_nhan", res)
        dispatch({ type: DELETE_SEND_REMINDER, payload: body.stk_nguoi_gui });
        return res;
      }
    })
    .finally(() => {});
};

export const payDebt = body => dispatch => {
  return fetch(API.PAY_DEBT, {
    method: 'POST',
    body:JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(response => response.json())
    .then(res => {
      if(res.status > 0){
        dispatch({ type: PAY_DEBT, payload: body.id });
      }
      return res;
    })
    .finally(() => {});
};

// reducer
export const sendList = (state = [], action) => {
  switch (action.type) {
    case SEND_LIST:
      return action.payload.list;
    case ADD_REMINDER:
      return [...state, action.payload];
    case DELETE_SEND_REMINDER:
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
export const receiveList = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_LIST:
      return action.payload.list;
    case PAY_DEBT:  
      const newState = state.find(i=>i.id===action.payload);
      newState.trang_thai = 2;
      return state;
    case DELETE_RECIEVER_REMINDER:
      return state.filter(item => item.stk_nguoi_nhan !== action.payload);
    default:
      return state;
    }
};