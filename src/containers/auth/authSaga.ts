//import { call, put, select, takeLatest } from 'redux-saga/effects';
//import { sagaActions } from '../../reduxInit/sagaActions';
//import { History } from 'history';

//export function* fetchOtp(action, history: History) {
//    //yield put(setCustomerPhone(payload.phone));
//    try {
//        console.log('Inside fetchotp generator function');
//        //const result = yield call(
//        //    apiRepository.getOtp,
//        //    getOtpPayload(payload.phone)
//        //);
//        //yield put(setOtpId(result.otpID));
//        //yield put(setLoading(false));
//        //yield put(
//        //    setNudgeMessage({
//        //        showNudge: true,
//        //        message: 'OTP sent to your Device',
//        //        type: NudgeType.SUCCESS,
//        //        position: Position.CENTER,
//        //    })
//        //);
//        //yield call(history.push, ROUTE_NAME.OTP_VERIFY.pathname);
//    } catch (e) {
//        const error = e?.error?.toString();
//        console.log('Error in fetchOtp API: ', error);
//    }
//}

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

//export default function* authSaga(history: History) {
//    yield takeLatest(sagaActions.FETCH_OTP, fetchOtp, history);
//}

export {};
