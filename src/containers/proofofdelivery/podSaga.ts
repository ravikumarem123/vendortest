import { call, put, takeLatest } from 'redux-saga/effects';
import { History } from 'history';
import { fetchPodPayload } from '../../network/createPayload';
import apiRepository from '../../network/apiRepository';
import sagaActions from '../../reduxInit/sagaActions';
import { setPodDetails, setPodError, setPodLoading } from './podSlice';
import { setSearchParams, setDialogOpen } from '../../common/commonSlice';
import { IResponse, ActionResult, Props } from './podTypes';

export function* fetchPodDetails(
    history: History,
    action: ActionResult<Props>
) {
    // const vendorId = 'VNDR-1526001151'; //VNDR-1526007917
    const vendorId = localStorage.getItem('vendorId') as string;
    try {
        const { payload } = action;
        if (payload) payload.vendorId = vendorId;
        if (
            payload?.searchText ||
            payload?.dateClicked ||
            !payload.lastReadInvoice
        ) {
            yield put(setPodLoading()); // ensure first api call in pagination
        }

        const result: IResponse = yield call(
            apiRepository.getPodInfo,
            fetchPodPayload(payload)
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
        yield put(setPodDetails(result));
    } catch (e: any) {
        yield put(setPodError(e?.error?.message));
        if (e?.error?.message === 'Failed to fetch') {
            const dialogPayload = {
                title: 'Something went wrong',
                content: 'please check your internet connection and try again.',
            };
            yield put(setDialogOpen(dialogPayload));
        } else if (e?.error?.cause?.status === 401) {
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

export default function* podSaga(history: History) {
    yield takeLatest(sagaActions.FETCH_POD_DETAILS, fetchPodDetails, history);
}
