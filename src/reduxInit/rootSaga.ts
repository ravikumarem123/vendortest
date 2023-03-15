import { all } from 'redux-saga/effects';
import podSaga from '../containers/proofofdelivery/podSaga';
import authSaga from '../containers/auth/authSaga';
import { History } from 'history';

export default function* rootSaga(history: History) {
    yield all([authSaga(history), podSaga(history)]);
}
