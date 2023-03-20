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
    //const testingVendorId = 'VNDR-1526001151'; //VNDR-1526007917
    const testingVendorId = localStorage.getItem('vendorId') as string;
    try {
        const { payload } = action;
        if (payload) payload.vendorId = testingVendorId;
        yield put(setPodLoading());
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
        yield put(setPodDetails(result));
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

export default function* podSaga(history: History) {
    yield takeLatest(sagaActions.FETCH_POD_DETAILS, fetchPodDetails, history);
}
