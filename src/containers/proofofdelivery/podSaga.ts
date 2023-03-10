import { call, put, select, takeLatest } from 'redux-saga/effects';
import { fetchInvoicePayload } from '../../network/createPayload';
import apiRepository from '../../network/apiRepository';
import { sagaActions } from '../../reduxInit/sagaActions';
import { History } from 'history';
import { Action } from 'redux';
import {
    setPodDetails,
    setPodError,
    setPodLoading,
    setSearchParams,
} from './podSlice';
import { Dayjs } from 'dayjs';

interface Props {
    searchText?: string;
    startTime?: Dayjs;
    endTime?: Dayjs;
    lastReadInvoice?: string;
}

interface ActionResult<T> extends Action<string> {
    type: string;
    payload: T;
}

interface IResponse {
    success: boolean;
    statusCode: number;
    error: string | null;
    data: object;
    fresh?: boolean;
}

export function* fetchPodDetails(
    history: History,
    action: ActionResult<Props>
) {
    try {
        //console.log(result);
        const { payload } = action;
        console.log(payload);
        if (payload?.searchText) {
            yield put(
                setSearchParams({ clicked: true, text: payload?.searchText })
            );
            const result: IResponse = yield call(
                apiRepository.getPodInfo,
                fetchInvoicePayload({
                    vendorId: 'VNDR-1526001151',
                    pageSize: 10,
                    invoiceNumber: payload?.searchText,
                })
            );
            result.fresh = true;
            yield put(setPodDetails(result));
        } else if (payload?.startTime && payload?.endTime) {
            console.log('call the API for date filter with page number 1');
            const result: IResponse = yield call(
                apiRepository.getPodInfo,
                fetchInvoicePayload({
                    vendorId: 'VNDR-1526001151',
                    pageSize: 10,
                    startTime: payload?.startTime,
                    endTime: payload?.endTime,
                })
            );
            result.fresh = true;
            yield put(setPodDetails(result));
        } else {
            console.log('call the API normally considering page number');
            const result: IResponse = yield call(
                apiRepository.getPodInfo,
                fetchInvoicePayload({
                    vendorId: 'VNDR-1526001151',
                    pageSize: 10,
                    lastReadInvoice: payload?.lastReadInvoice,
                })
            );
            result.fresh = false;
            console.log(result);
            yield put(setPodDetails(result));
        }
    } catch (e) {
        console.log('Inside catch: ', e);
        //const error = e.error?.toString();
        //yield put(setLedgerError(error));
        //yield put(
        //    setNudgeMessage({
        //        showNudge: true,
        //        message: error,
        //        type: NudgeType.ERROR,
        //        position: Position.CENTER,
        //    })
        //);
    }
}

export default function* podSaga(history: History) {
    yield takeLatest(sagaActions.FETCH_POD_DETAILS, fetchPodDetails, history);
}
