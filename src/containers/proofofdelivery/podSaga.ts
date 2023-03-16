import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchInvoicePayload } from '../../network/createPayload';
import apiRepository from '../../network/apiRepository';
import { sagaActions } from '../../reduxInit/sagaActions';
import { History } from 'history';
import {
    setPodDetails,
    setPodError,
    setPodLoading,
    setSearchParams,
} from './podSlice';
import { IResponse, ActionResult, Props, Error } from './podTypes';
import { setDialogOpen } from '../../common/commonSlice';

export function* fetchPodDetails(
    history: History,
    action: ActionResult<Props>
) {
    const testingVendorId = 'VNDR-1526001151'; //VNDR-1526007917
    //const testingVendorId = localStorage.getItem('vendorId');
    try {
        const { payload } = action;
        if (payload) payload.vendorId = testingVendorId;
        const result: IResponse = yield call(
            apiRepository.getPodInfo,
            fetchInvoicePayload(payload)
        );
        if (payload?.searchText || payload?.dateClicked) {
            result.fresh = true;
        } else {
            result.fresh = false;
        }
        if (payload.searchText) {
            yield put(
                setSearchParams({ clicked: true, text: payload?.searchText })
            );
        }

        //yield put(
        //    setSearchParams({ clicked: true, text: payload?.searchText })
        //);
        yield put(setPodDetails(result));
        //if (payload?.searchText) {
        //    const result: IResponse = yield call(
        //        apiRepository.getPodInfo,
        //        fetchInvoicePayload({
        //            vendorId: testingVendorId,
        //            pageSize: 10,
        //            invoiceNumber: payload?.searchText,
        //        })
        //    );
        //    result.fresh = true;
        //    yield put(
        //        setSearchParams({ clicked: true, text: payload?.searchText })
        //    );
        //    yield put(setPodDetails(result));
        //} else if (payload?.dateClicked) {
        //    console.log('call the API for date filter with page number 1');
        //    const result: IResponse = yield call(
        //        apiRepository.getPodInfo,
        //        fetchInvoicePayload({
        //            vendorId: testingVendorId,
        //            pageSize: 20,
        //            startTime: payload?.startTime,
        //            endTime: payload?.endTime,
        //        })
        //    );
        //    result.fresh = true;
        //    yield put(setPodDetails(result));
        //} else {
        //    console.log('call the API normally considering page number');
        //    const result: IResponse = yield call(
        //        apiRepository.getPodInfo,
        //        fetchInvoicePayload({
        //            vendorId: testingVendorId,
        //            pageSize: payload?.pageSize ?? 10,
        //            lastReadInvoice: payload?.lastReadInvoice,
        //            startTime: payload?.startTime,
        //            endTime: payload?.endTime,
        //        })
        //    );
        //    result.fresh = false;
        //    yield put(setPodDetails(result));
        //}
    } catch (e: any) {
        console.log(e);
        yield put(setPodError(e?.error?.message));
        if (e?.error?.message === 'Failed to fetch') {
            const dialogPayload = {
                title: 'Something went wrong',
                content: 'please check your internet connection and try again.',
            };
            yield put(setDialogOpen(dialogPayload));
        } else {
            if (e?.error?.cause?.status === 401) {
                const dialogPayload = {
                    title: 'someting went wrong',
                    content: `${e?.error?.message} You’ll be logged out, please login again to continue`,
                    logout: true,
                };
                yield put(setDialogOpen(dialogPayload));
            } else if (e?.error?.message?.length > 0) {
                const dialogPayload = {
                    title: 'someting went wrong',
                    content: `${e?.error?.message}. ${
                        e?.error?.cause?.status?.toString().includes('5')
                            ? 'Please Refresh to try again'
                            : ''
                    }`,
                };
                yield put(setDialogOpen(dialogPayload));
                //} else if ((e.error.name = 'TimeoutError')) {
                //    const dialogPayload = {
                //        title: 'ERR_TIMEOUT',
                //        content:
                //            'Timeout: It took more than 5 seconds to get the result!',
                //    };
                //    yield put(setDialogOpen(dialogPayload));
            } else {
                const dialogPayload = {
                    title: 'someting went wrong',
                    content: 'Please try again later, or contact support',
                };
                yield put(setDialogOpen(dialogPayload));
            }
        }
    }
}

export default function* podSaga(history: History) {
    yield takeLatest(sagaActions.FETCH_POD_DETAILS, fetchPodDetails, history);
}
