import URL from './URL';

const API = {
  LOGIN: `${URL}/api/auth`,
  // login
  GET_USER_ACCOUNT: `${URL}/api/saving-account/list`,
  GET_USER_INFO:`${URL}/api/user/info`,
  GET_NEW_TOKEN:`${URL}/api/auth/refresh`,
  //receiver
  RECEIVER_LIST: `${URL}/api/recipient-list/list`,
  ADD_RECEIVER: `${URL}/api/recipient-list`,
  GET_BANK_LIST: `${URL}/api/bank`,
  DELETE_RECEIVER:`${URL}/api/recipient-list/delete`,
  UPDATE_RECEIVER: `${URL}/api/recipient-list/name`,
  // Transfer
  GET_OTP: `${URL}/api/otp`,
  VERIFY: `${URL}/api/otp/verify`,
  PAY_MONEY: `${URL}/api/money/send-money-user`,
  // user
  ADD_USER:`${URL}/api/user`,
  CHANGE_PASS:`${URL}/api/user/password`,
  FORGOT_PASS: `${URL}/api/user/forget-password `,
  // reminder
  ADD_REMINDER: `${URL}/api/debt-reminder`,
  DELETE_REMINDER: `${URL}/api/debt-reminder/delete`,
  SEND_LIST: `${URL}/api/debt-reminder/list-send`,
  RECEIVE_LIST: `${URL}/api/debt-reminder/list-receive`,
  PAY_DEBT:`${URL}/api/debt-reminder/pay`,
  // history
  RECEIVE_HISTORY:`${URL}/api/history-money/receive`,
  PAY_HISTORY:`${URL}/api/history-money/send`,
  DEBT_HISTORY: `${URL}/api/history-money/pay-debt`,
  // employee
  EMPLOYEE_LIST: `${URL}/api/account/employee`,
  ADD_EMPLOYEE: `${URL}/api/account/employee`, 
  UPDATE_EMPLOYEE: `${URL}/api/account/info`, 
  DELETE_EMPLOYEE: `${URL}/api/account/delete-employee`,
  PROMOTE_EMPLOYEE: `${URL}/api/account/rank`, 
  // report
  REPORT_LIST: `${URL}/api/history-admin/all`,
};

export default API;
