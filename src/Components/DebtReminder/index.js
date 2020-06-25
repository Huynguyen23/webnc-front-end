
import { connect } from 'react-redux';
import { DebtReminder as Component } from './DebtReminder';
import {
    getSendList,
    getReceiveList,
    addReminder,
    deleteReminder
} from '../../Reducers/DebtReminder.reducer';

const mapStateToProps = state => {
  return {
    data1: state.receiveList, 
    data: state.sendList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSendList: (params, cb) => dispatch(getSendList(params, cb)),
    getReceiveList: (params, cb) => dispatch(getReceiveList(params, cb)),
    deleteReminder:(params, cb) => dispatch(deleteReminder(params, cb)),
    addReminder: (params, cb) => dispatch(addReminder(params, cb))
  };
};
export const DebtReminder = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
