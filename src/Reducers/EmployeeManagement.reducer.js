/* eslint-disable no-console */
import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../Services/API';
import moment from 'moment';

const EMPLOYEE_LIST = 'EMPLOYEE_LIST';
const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
const UPDATE_REMINDER = 'UPDATE_REMINDER';
// action

export const getEmployeeList = body => dispatch => {
  return (
    fetch(API.EMPLOYEE_LIST, {
      method: 'GET'
    })
      .then(response => response.json())
      // return getData()
      .then(res => {
        // if (res === true) {
          console.log("RECEIVE_LIST", res);
        dispatch({ type: EMPLOYEE_LIST, payload: res });
        // }
      })
      .catch(() => {
        Swal.fire('Lỗi', 'Lỗi mạng', 'error');
        return false;
      })
  );
};

export const addEmployee = body => dispatch => {
  console.log("body", body);
  return (
    fetch(API.ADD_EMPLOYEE, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then(response => response.json())
      .then(res => {
        console.log("res", res);
        if (res.status > 0) {
          const param = {...body};
          param.tai_khoan = res.tai_khoan;
          param.ngay_tao =  moment().format('YYYY MM DD');
          dispatch({ type: ADD_EMPLOYEE, payload: param });
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

export const deleteEmployee = body => dispatch => {
  console.log("body", body)
  return fetch(API.DELETE_EMPLOYEE, {
    method: 'PUT',
    body:JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  })
    .then(response => response.json())
    .then(res => {
      if (res.status > 0) {
        dispatch({ type: DELETE_EMPLOYEE, payload: body });
      }
      return res;
    })
    .finally(() => {});
};

// reducer
export const employeeList = (state = [], action) => {
  switch (action.type) {
    case EMPLOYEE_LIST:
      return action.payload.list;
    case ADD_EMPLOYEE:
      return [...state, action.payload];
    case DELETE_EMPLOYEE:
      console.log("body", action.payload)
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
    }
};