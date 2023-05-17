import { all } from 'redux-saga/effects';
import { History } from 'history';
import podSaga from '../containers/proofofdelivery/podSaga';
import authSaga from '../containers/auth/authSaga';
import paymentSaga from '../containers/payments/paymentSaga';
import invoiceSaga from '../containers/invoices/invoiceSaga';

export default function* rootSaga(history: History) {
    yield all([
        authSaga(history),
        podSaga(history),
        paymentSaga(history),
        invoiceSaga(history),
    ]);
}
