/* eslint-disable no-console */
import fetch from 'cross-fetch';
import Swal from 'sweetalert2';
import API from '../Services/API';
import moment from 'moment';

const EMPLOYEE_LIST = 'EMPLOYEE_LIST';
const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
const PROMOTE_EMPLOYEE = 'PROMOTE_EMPLOYEE';
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

export const updateEmployee = body => dispatch => {
  return (
    fetch(API.UPDATE_EMPLOYEE, {
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
          dispatch({ type: UPDATE_EMPLOYEE, payload: body });
        }
        return res;
      })
  );
};
export const promoteEmployee = body => dispatch => {
  return (
    fetch(API.PROMOTE_EMPLOYEE, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
      .then(response => response.json())
      .then(res => {
        if (res.status > 0) {
          dispatch({ type: PROMOTE_EMPLOYEE, payload: body });
        }
        return res;
      })
  );
};

export const deleteEmployee = body => dispatch => {
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
    case UPDATE_EMPLOYEE:
      const newEmployee = state.find(i=>i.tai_khoan === action.payload.tai_khoan);
      newEmployee.ten = action.payload.ten;
      newEmployee.ngay_sinh = action.payload.ngay_sinh;
      newEmployee.dia_chi = action.payload.dia_chi;
      newEmployee.cmnd = action.payload.cmnd;
      return state;
    case PROMOTE_EMPLOYEE:
      const promoteEmployee = state.find(i=>i.tai_khoan === action.payload.tai_khoan);
      promoteEmployee.cap_bac = action.payload.so_bac;
      return state;
    case DELETE_EMPLOYEE:
      console.log("body", action.payload)
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
    }
};