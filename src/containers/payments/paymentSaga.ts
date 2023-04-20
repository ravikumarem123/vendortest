import { call, put, takeLatest } from 'redux-saga/effects';
import {
    fetchInvoicePayload,
    fetchGetUTRPayload,
} from '../../network/createPayload';
import apiRepository from '../../network/apiRepository';
import { sagaActions } from '../../reduxInit/sagaActions';
import { History } from 'history';
import { setUTRList, setPaymentError, setPaymentLoading } from './paymentSlice';
import { setSearchParams } from '../../common/commonSlice';
import { IResponse, ActionResult, Props, Error } from './paymentTypes';
import { setDialogOpen } from '../../common/commonSlice';

export function* fetchPaymentDetails(
    history: History,
    action: ActionResult<Props>
) {
    //const testingVendorId = 'VNDR-1526001151'; //VNDR-1526007917
    const testingVendorId = localStorage.getItem('vendorId') as string;
    try {
        const { payload } = action;
        if (payload) payload.vendorId = testingVendorId;
        yield put(setPaymentLoading());
        const result: IResponse = yield call(
            apiRepository.getUTRList,
            fetchGetUTRPayload()
        );
        if (
            payload?.searchText ||
            payload?.dateClicked ||
            !payload?.lastReadInvoice
        ) {
            result.fresh = true;
        } else {
            result.fresh = false;
        }
        if (payload.searchText) {
            yield put(
                setSearchParams({ clicked: true, text: payload?.searchText })
            );
        }
        yield put(setUTRList(result));
    } catch (e: any) {
        console.log(e);
        yield put(setPaymentError(e?.error?.message));
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
}

export default function* paymentSaga(history: History) {
    yield takeLatest(
        sagaActions.FETCH_PAYMENT_DETAILS,
        fetchPaymentDetails,
        history
    );
}
