import { connect } from 'react-redux';
import { BankTransfer as Component } from './BankTransfer';
import { getInfo } from '../../Reducers/Actions/Home';
import {
    getReceiverList
  } from '../../Reducers/Receiver.reducer';
  const mapStateToProps = state => {
    return {
      data: state.receiverList
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      getReceiverList: (params, cb) => dispatch(getReceiverList(params, cb)),
      getInfo:(params, cb) => dispatch(getInfo(params,cb))
    };
  };
  export const BankTransfer = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);