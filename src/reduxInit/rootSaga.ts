import { all } from 'redux-saga/effects';
import podSaga from '../containers/proofofdelivery/podSaga';
import { History } from 'history';

export default function* rootSaga(history: History) {
    yield all([podSaga(history)]);
}
