
import { connect } from 'react-redux';
import { ReceiverList as Component } from './ReceiverList';
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
  };
};
export const ReceiverList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
