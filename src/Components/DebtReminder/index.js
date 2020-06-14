
import { connect } from 'react-redux';
import { DebtReminder as Component } from './DebtReminder';
import {
    getReminderList
} from '../../Reducers/DebtReminder.reducer';

const mapStateToProps = state => {
  return {
    data: state.reminderList
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getReminderList: (params, cb) => dispatch(getReminderList(params, cb)),
  };
};
export const DebtReminder = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);
