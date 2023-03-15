import { combineReducers } from 'redux';
import commonSlice from '../common/commonSlice';
import authSlice from '../containers/auth/authSlice';
import counterSlice from '../containers/counter/counterSlice';
import podSlice from '../containers/proofofdelivery/podSlice';

const appReducer = combineReducers({
    counter: counterSlice,
    pod: podSlice,
    common: commonSlice,
    auth: authSlice,
});

export default appReducer;
