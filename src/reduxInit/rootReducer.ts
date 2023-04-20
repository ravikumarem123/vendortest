import { combineReducers } from 'redux';
import commonSlice from '../common/commonSlice';
import authSlice from '../containers/auth/authSlice';
import counterSlice from '../containers/counter/counterSlice';
import podSlice from '../containers/proofofdelivery/podSlice';
import paymentSlice from '../containers/payments/paymentSlice';

const appReducer = combineReducers({
    counter: counterSlice,
    pod: podSlice,
    common: commonSlice,
    auth: authSlice,
    payment: paymentSlice,
});

export default appReducer;
