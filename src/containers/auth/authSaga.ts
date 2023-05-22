import { call, put, select, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux';
import { History } from 'history';
import sagaActions from '../../reduxInit/sagaActions';
import {
    IVerifyEmailResponse,
    IGenerateOtpResponse,
    AUTH_SCREENS,
    IValidateOtpResponse,
    ISetPasswordResponse,
} from './authTypes';
import {
    fetchVerifyEmailPayload,
    fetchVerifyOtpPayload,
    fetchValidatePasswordPayload,
    fetchSetPasswordPayload,
    fetchGenerateOtpPayload,
    resendOtpPayload,
} from '../../network/createPayload';
import apiRepository from '../../network/apiRepository';
import { setDialogOpen } from '../../common/commonSlice';
import {
    setActiveAuthScreen,
    setAuthLoading,
    setAuthSession,
    setAuthdetails,
    setUserEmail,
} from './authSlice';
import { getAuthSessionId, getUserEmail } from './authSelector';

interface Props {
    emailId: string;
    password: string;
}

interface ActionResult<T> extends Action<string> {
    type: string;
    payload: T;
}

function* handleAPIErrors(e: any) {
    if (e?.error?.message === 'Failed to fetch') {
        const dialogPayload = {
            title: 'Something went wrong',
            content: 'please check your internet connection and try again.',
        };
        yield put(setDialogOpen(dialogPayload));
    } else if (e?.error?.cause?.status === 401) {
        const dialogPayload = {
            title: 'Something went wrong',
            content: `${e?.error?.message} Login again to continue`,
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

export function* verifyEmail(history: History, action: ActionResult<Props>) {
    try {
        const { payload } = action;
        yield put(setAuthLoading(true));
        const result: IVerifyEmailResponse = yield call(
            apiRepository.verifyEmail,
            fetchVerifyEmailPayload(payload.emailId)
        );
        yield put(setAuthLoading(false));
        yield put(setUserEmail(result.emailId));
        yield put(setAuthSession(result.sessionId));
        yield put(setActiveAuthScreen(result.nextPage));
    } catch (e: any) {
        yield call(handleAPIErrors, e);
        yield put(setAuthLoading(false));
    }
}

interface IGenerateOtpProps {
    loginPurpose: string;
}

export function* generateOTP(
    history: History,
    action: ActionResult<IGenerateOtpProps>
) {
    try {
        const { payload } = action;
        yield put(setAuthLoading(true));
        const emailId: string = yield select(getUserEmail);
        const sessionId: string = yield select(getAuthSessionId);

        const result: IGenerateOtpResponse = yield call(
            apiRepository.generateOTP,
            fetchGenerateOtpPayload({
                emailId,
                sessionId,
                loginPurpose: payload.loginPurpose,
            })
        );

        yield put(setAuthLoading(false));
        yield put(setActiveAuthScreen(result.nextPage));
    } catch (e: any) {
        yield call(handleAPIErrors, e);
        yield put(setAuthLoading(false));
    }
}

export function* resendOtp() {
    try {
        yield put(setAuthLoading(true));
        const emailId: string = yield select(getUserEmail);
        const sessionId: string = yield select(getAuthSessionId);

        yield call(
            apiRepository.resendOTP,
            resendOtpPayload({
                emailId,
                sessionId,
            })
        );
        yield put(setAuthLoading(false));
        // yield put(setActiveAuthScreen(result.nextPage));
    } catch (e: any) {
        yield call(handleAPIErrors, e);
        yield put(setAuthLoading(false));
    }
}

interface IVerifyOtpProps {
    otp: string;
}

export function* verifyOtp(
    history: History,
    action: ActionResult<IVerifyOtpProps>
) {
    try {
        const { payload } = action;
        yield put(setAuthLoading(true));
        const emailId: string = yield select(getUserEmail);
        const sessionId: string = yield select(getAuthSessionId);
        const result: IValidateOtpResponse = yield call(
            apiRepository.verifyOTP,
            fetchVerifyOtpPayload({ emailId, sessionId, otp: payload.otp })
        );
        if (result.nextPage === AUTH_SCREENS.SET_PWD_PAGE) {
            yield put(setActiveAuthScreen(result.nextPage));
        } else {
            const { accessToken, profile } = result.userData;
            yield put(setAuthdetails(profile));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('userDetails', JSON.stringify(profile));
            yield call(history.push, '/pod');
        }
    } catch (e: any) {
        yield call(handleAPIErrors, e);
        yield put(setAuthLoading(false));
    }
}

interface ISetPasswordProps {
    password: string;
}

export function* setPassword(
    history: History,
    action: ActionResult<ISetPasswordProps>
) {
    try {
        const { payload } = action;
        yield put(setAuthLoading(true));
        const emailId: string = yield select(getUserEmail);
        const sessionId: string = yield select(getAuthSessionId);

        const result: ISetPasswordResponse = yield call(
            apiRepository.setPassword,
            fetchSetPasswordPayload({
                emailId,
                sessionId,
                password: payload.password,
            })
        );
        yield put(setAuthLoading(false));
        yield put(setActiveAuthScreen(result.nextPage));
    } catch (e: any) {
        yield call(handleAPIErrors, e);
        yield put(setAuthLoading(false));
    }
}

export function* validatePassword(
    history: History,
    action: ActionResult<ISetPasswordProps>
) {
    try {
        const { payload } = action;
        yield put(setAuthLoading(true));

        const emailId: string = yield select(getUserEmail);
        const sessionId: string = yield select(getAuthSessionId);

        const result: IValidateOtpResponse = yield call(
            apiRepository.validatePassword,
            fetchValidatePasswordPayload({
                emailId,
                sessionId,
                password: payload.password,
            })
        );
        const { accessToken, profile } = result.userData;
        yield put(setAuthdetails(profile));
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('userDetails', JSON.stringify(profile));
        yield call(history.push, '/pod');
    } catch (e: any) {
        yield call(handleAPIErrors, e);
        yield put(setAuthLoading(false));
    }
}

export default function* authSaga(history: History) {
    yield takeLatest(sagaActions.AUTH.VERIFY_EMAIL, verifyEmail, history);
    yield takeLatest(sagaActions.AUTH.GENERATE_OTP, generateOTP, history);
    yield takeLatest(sagaActions.AUTH.VERIFY_OTP, verifyOtp, history);
    yield takeLatest(
        sagaActions.AUTH.VALIDATE_PASSWORD,
        validatePassword,
        history
    );
    yield takeLatest(sagaActions.AUTH.SET_PASSWORD, setPassword, history);
    yield takeLatest(sagaActions.AUTH.RESEND_OTP, resendOtp);
}
