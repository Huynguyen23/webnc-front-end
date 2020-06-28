import { connect } from 'react-redux';
import { History as Component } from './History';
import {getReceiveHistoryList, getPayHistoryList, getDebtHistoryList} from '../../Reducers/History.reducer';

  const mapStateToProps = state => {
    return {
      receiveHistoryList: state.receiveHistoryList,
      payHistoryList: state.payHistoryList,
      debtHistoryList: state.debtHistoryList,

    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      getReceiveHistoryList:(params, cb) => dispatch(getReceiveHistoryList(params, cb)),
      getPayHistoryList:(params, cb) => dispatch(getPayHistoryList(params, cb)),
      getDebtHistoryList:(params, cb) => dispatch(getDebtHistoryList(params, cb)),
    }
  };
  export const History = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);