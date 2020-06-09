
import { connect } from 'react-redux';
import { ReceiverList as Component } from './ReceiverList';
import {
  getReceiverList,
  addReceiver,
  deleteReceiver,
  updateReceiver
} from '../../Reducers/Receiver.reducer';

const mapStateToProps = state => {
  return {
    data: state.receiverList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getReceiverList: (params, cb) => dispatch(getReceiverList(params, cb)),
    addReceiver: (params, cb) => dispatch(addReceiver(params, cb)),
    updateReceiver: (params, cb) => dispatch(updateReceiver(params, cb)),
    deleteReceiver: (params, cb) => dispatch(deleteReceiver(params, cb))
  };
};
export const ReceiverList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
