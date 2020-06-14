import { combineReducers } from 'redux';
import * as receiverList from './Receiver.reducer';
import * as reminderList from './DebtReminder.reducer';

const rootReducer = combineReducers({
    ...receiverList,
    ...reminderList
});

export default rootReducer;