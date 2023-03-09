import { combineReducers } from 'redux';
import counterSlice from '../containers/counter/counterSlice';
import podSlice from '../containers/proofofdelivery/podSlice';

const appReducer = combineReducers({
    counter: counterSlice,
    pod: podSlice,
});

export default appReducer;
