import { call, put, select, takeLatest } from 'redux-saga/effects';
import { NavigateFunction } from 'react-router-dom';
import { sagaActions } from '../../reduxInit/sagaActions';
import { Action } from 'redux';
import { History } from 'history';
import { UserDetails, IResponse } from './authTypes';
import { 
	fetchLoginPayload, 
	fetchVerifyEmailPayload, 
	fetchVerifyOtpPayload,
	fetchValidatePasswordPayload,
	fetchSetPasswordPayload,
} from '../../network/createPayload';
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

function* handleAPIErrors(e: any) {
    //yield put(setPaymentError(e?.error?.message));
    if (e?.error?.message === 'Failed to fetch') {
        const dialogPayload = {
            title: 'Something went wrong',
            content: 'please check your internet connection and try again.',
        };
        yield put(setDialogOpen(dialogPayload));
    } else {
        if (e?.error?.cause?.status === 401) {
            const dialogPayload = {
                title: 'Something went wrong',
                content: `${e?.error?.message} You’’ll be logged out, please login again to continue`,
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

export function* verifyEmail(history: History, action: ActionResult<Props>) {
    try {
        const { payload } = action;
        const result: IResponse = yield call(
            apiRepository.verifyEmail,
            fetchVerifyEmailPayload()
        );
		console.log(result);
        //yield put(setAuthdetails(result));
        //localStorage.setItem('vendorId', result.vendorId);
        //localStorage.setItem('userDetails', JSON.stringify(result));
        //yield call(history.push, '/');
    } catch (e: any) {
        console.log('error in login: ', e);
        yield call(handleAPIErrors, e);
    }
}

export function* verifyOtp(history: History, action: ActionResult<Props>) {
	try {
        const { payload } = action;
        const result: IResponse = yield call(
            apiRepository.verifyOTP,
            fetchVerifyOtpPayload()
        );
		console.log(result);
        //yield put(setAuthdetails(result));
        //localStorage.setItem('vendorId', result.vendorId);
        //localStorage.setItem('userDetails', JSON.stringify(result));
        //yield call(history.push, '/');
    } catch (e: any) {
        console.log('error in login: ', e);
        yield call(handleAPIErrors, e);
    }
}

export function* setPassword(history: History, action: ActionResult<Props>) {
	try {
        const { payload } = action;
        const result: IResponse = yield call(
            apiRepository.setPassword,
            fetchSetPasswordPayload()
        );
		console.log(result);
        //yield put(setAuthdetails(result));
        //localStorage.setItem('vendorId', result.vendorId);
        //localStorage.setItem('userDetails', JSON.stringify(result));
        //yield call(history.push, '/');
    } catch (e: any) {
        console.log('error in login: ', e);
        yield call(handleAPIErrors, e);
    }
}

export function* validatePassword(history: History, action: ActionResult<Props>) {
	try {
        const { payload } = action;
        const result: IResponse = yield call(
            apiRepository.validatePassword,
            fetchValidatePasswordPayload()
        );
		console.log(result);
        //yield put(setAuthdetails(result));
        //localStorage.setItem('vendorId', result.vendorId);
        //localStorage.setItem('userDetails', JSON.stringify(result));
        //yield call(history.push, '/');
    } catch (e: any) {
        console.log('error in login: ', e);
        yield call(handleAPIErrors, e);
    }
}

//export function* logout() {
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
//}

export default function* authSaga(history: History) {
    yield takeLatest(sagaActions.AUTH.VERIFY_EMAIL , verifyEmail, history);
	yield takeLatest(sagaActions.AUTH.VERIFY_OTP, verifyOtp, history);
	yield takeLatest(sagaActions.AUTH.VALIDATE_PASSWORD, validatePassword, history);
	yield takeLatest(sagaActions.AUTH.SET_PASSWORD, setPassword, history);
}
