import { connect } from 'react-redux';
import { History as Component } from './History';

  const mapStateToProps = state => {
    return {
      data: state.receiverList
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
    };
  };
  export const History = connect(
    mapStateToProps,
    mapDispatchToProps
  )(Component);