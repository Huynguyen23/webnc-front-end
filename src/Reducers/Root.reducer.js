import { combineReducers } from 'redux';
import * as receiverList from './Receiver.reducer';

const rootReducer = combineReducers({
    ...receiverList,
});

export default rootReducer;