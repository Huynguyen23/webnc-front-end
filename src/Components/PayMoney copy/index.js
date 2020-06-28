import { connect } from 'react-redux';
import { PayMoney as Component } from './PayMoney';

  const mapStateToProps = state => {
    return {
      data: state.receiverList
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
    };
  };
  export const PayMoney = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);