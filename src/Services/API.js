import URL from './URL';

const API = {
  LOGIN: `${URL}/api/auth`,
  // login
  GET_USER_ACCOUNT: `${URL}/api/saving-account/list`,
  GET_USER_INFO:`${URL}/api/user/info`,
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
};

export default API;
