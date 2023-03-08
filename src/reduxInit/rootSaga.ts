import { all } from 'redux-saga/effects';
import authSaga from '../containers/auth/authSaga';
import { History } from 'history';

export default function* rootSaga(history: History) {
    yield all([authSaga(history)]);
}
