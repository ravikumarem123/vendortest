import { combineReducers } from 'redux';
import commonSlice from '../common/commonSlice';
import authSlice from '../containers/auth/authSlice';
import counterSlice from '../containers/counter/counterSlice';
import podSlice from '../containers/proofofdelivery/podSlice';
import paymentSlice from '../containers/payments/paymentSlice';
import invoiceSlice from '../containers/invoices/invoiceSlice';

const appReducer = combineReducers({
    counter: counterSlice,
    pod: podSlice,
    common: commonSlice,
    auth: authSlice,
    payment: paymentSlice,
	invoice: invoiceSlice,
});

export default appReducer;
