/* eslint-disable no-console */
import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../Services/API';

const RECEIVER_LIST = 'RECEIVER_LIST';
const ADD_RECEIVER = 'ADD_RECEIVER';
const DELETE_RECEIVER = 'DELETE_COMPANY';
const SET_AUTH_RECEIVER = 'SET_AUTH_RECEIVER';
const UPDATE_RECEIVER = 'UPDATE_RECEIVER';
// action

export const getReceiverList = body => dispatch => {
  return (
    fetch(API.RECEIVER_LIST, {
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
        dispatch({ type: RECEIVER_LIST, payload: res });
        // }
      })
      .catch(() => {
        Swal.fire('Lỗi', 'Lỗi mạng', 'error');
        return false;
      })
  );
};

export const addReceiver = body => dispatch => {
  return (
    fetch(API.ADD_RECEIVER, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      // .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res) {
          dispatch({ type: ADD_RECEIVER, payload: body });
          return true;
        }
        return false;
      })
  );
};

export const updateReceiver = body => dispatch => {
  console.log("updateRECEIVER", body);
  return (
    fetch(API.UPDATE_RECEIVER, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      // .then(response => response.json())
      .then(res => {
        console.log(res);
        if (res) {
          dispatch({ type: UPDATE_RECEIVER, payload: body });
          return true;
        }
        return false;
      })
  );
};

export const deleteReceiver = body => dispatch => {
  return fetch(API.DELETE_RECEIVER(body.id), {
    method: 'GET'
  })
    .then(response => response.json())
    .then(res => {
      if (res === true) {
        dispatch({ type: DELETE_RECEIVER, payload: body.id });
      }
    })
    .finally(() => {});
};
// reducer
export const receiverList = (state = [], action) => {
  switch (action.type) {
    case RECEIVER_LIST:
      return action.payload.list;
    case ADD_RECEIVER:
      return [...state, action.payload];
    case DELETE_RECEIVER:
      return state.filter(item => item.id !== action.payload);
    case UPDATE_RECEIVER: {
      const newState = state.filter(item => item.id !== action.payload.id);
      console.log('aaaaa', [...newState, action.payload]);
      return [...newState, action.payload];
    }
    default:
      return state;
  }
};
