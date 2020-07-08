import { combineReducers } from 'redux';
import * as receiverList from './Receiver.reducer';
import * as reminderList from './DebtReminder.reducer';
import * as receiveHistoryList from './History.reducer';
import * as payHistoryList from './History.reducer';
import * as debtHistoryList from './History.reducer';
import * as employeeList from './EmployeeManagement.reducer';

const rootReducer = combineReducers({
    ...receiverList,
    ...reminderList,
    ...receiveHistoryList,
    ...payHistoryList,
    ...debtHistoryList,
    ...employeeList
});

export default rootReducer;