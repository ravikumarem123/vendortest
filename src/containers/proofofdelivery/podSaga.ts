import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getJCLedgerPayload } from '../../network/createPayload';
import apiRepository from '../../network/apiHandler';
import { sagaActions } from '../../reduxInit/sagaActions';
import { History } from 'history';
import { Action } from 'redux';
import {
    setPodDetails,
    setPodError,
    setPodLoading,
    setSearchClicked,
} from './podSlice';
import { Dayjs } from 'dayjs';

interface Props {
    searchText?: string;
    fromDate?: string;
    toDate?: string;
}

interface ActionResult<T> extends Action<string> {
    type: string;
    payload: T;
}

export function* fetchPodDetails(
    history: History,
    action: ActionResult<Props>
) {
    try {
        console.log('Inside FetchPodDetails: ', action, history);
        const { payload } = action;
        if (payload.searchText) {
            //call the API for search text with page number 1
            yield put(setSearchClicked(true));
        } else if (payload.fromDate && payload.toDate) {
            // call the API for date filter with page number 1
        } else {
            // call the API normally considering page number
        }
        //const businessId = yield select(AuthSelector.getBusinessId);
        //const result = yield call(
        //    apiRepository.getJCLedger,
        //    getJCLedgerPayload(businessId, payload.payload.pageNumber, 20)
        //);
        //const walletDetailsPayload = {
        //    balance: result.data.walletBO.balance,
        //    hasMore: result.hasMore,
        //    walletId: result.data.walletBO.walletId,
        //    walletOwnerId: result.data.walletBO.walletOwnerId,
        //    transactionList: result.data.j24LedgerBOList,
        //    pageNumber: result.currentPage,
        //};
        //yield put(setWalletDetails(walletDetailsPayload));
    } catch (e) {
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
