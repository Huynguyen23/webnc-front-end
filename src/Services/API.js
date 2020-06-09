import URL from './URL';

const API = {
  LOGIN: `${URL}/api/auth`,
  // login
  GET_USER_ACCOUNT: `${URL}/api/saving-account/list`,
  //receiver
  RECEIVER_LIST: `${URL}/api/recipient-list/list`,
  ADD_RECEIVER: `${URL}/api/recipient-list`,
  GET_BANK_LIST: `${URL}/api/bank`,
  DELETE_RECEIVER:`${URL}/api/recipient-list/delete`,
  UPDATE_RECEIVER: `${URL}/api/recipient-list/name`
};

export default API;
