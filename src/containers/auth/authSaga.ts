import { call, put, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux';
import { History } from 'history';
import sagaActions from '../../reduxInit/sagaActions';
import { IResponse } from './authTypes';
import { fetchLoginPayload } from '../../network/createPayload';
import apiRepository from '../../network/apiRepository';
import { setDialogOpen } from '../../common/commonSlice';
import { setAuthdetails } from './authSlice';

interface Props {
    emailId: string;
    password: string;
}

interface ActionResult<T> extends Action<string> {
    type: string;
    payload: T;
}

export function* login(history: History, action: ActionResult<Props>) {
    try {
        const { payload } = action;
        const result: IResponse = yield call(
            apiRepository.login,
            fetchLoginPayload({
                emailId: payload.emailId,
                password: payload.password,
            })
        );
        yield put(setAuthdetails(result));
        localStorage.setItem('vendorId', result.vendorId);
        localStorage.setItem('userDetails', JSON.stringify(result));
        yield call(history.push, '/');
    } catch (e: any) {
        if (e?.error?.message === 'Failed to fetch') {
            const dialogPayload = {
                title: 'Something went wrong',
                content: 'please check your internet connection and try again.',
            };
            yield put(setDialogOpen(dialogPayload));
        } else if (e?.error?.cause?.status === 401) {
            const dialogPayload = {
                title: 'Something went wrong',
                content: `${e?.error?.message}`,
                logout: true,
            };
            yield put(setDialogOpen(dialogPayload));
        } else if (e?.error?.cause?.status?.toString().includes('5')) {
            const dialogPayload = {
                title: 'Something went wrong',
                content: `Please try again after some time`,
            };
            yield put(setDialogOpen(dialogPayload));
        } else if (e?.error?.cause?.status?.toString().includes('4')) {
            const dialogPayload = {
                title: 'Something went wrong',
                content: `${
                    e?.error?.message
                        ? e?.error?.message
                        : 'Please try again after some time'
                }`,
            };
            yield put(setDialogOpen(dialogPayload));
        } else {
            const dialogPayload = {
                title: 'Something went wrong',
                content: 'Please try again after some time',
            };
            yield put(setDialogOpen(dialogPayload));
        }
    }
}

// export function* logout() {
//    //try {
//    //    const result = yield call(apiRepository.logout, {});
//    //    localStorage.clear();
//    //    yield call(history.push, ROUTE_NAME.LOGIN.pathname);
//    //} catch (e) {
//    //    const error = e?.error?.toString();
//    //    localStorage.clear();
//    //    yield call(history.push, ROUTE_NAME.LOGIN.pathname);
//    //    yield put(
//    //        setNudgeMessage({
//    //            showNudge: true,
//    //            message: error,
//    //            type: NudgeType.ERROR,
//    //            position: Position.CENTER,
//    //        })
//    //    );
//    //}
// }

export default function* authSaga(history: History) {
    yield takeLatest(sagaActions.LOGIN, login, history);
}
