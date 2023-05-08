import { call, put, takeLatest } from 'redux-saga/effects';
import { writeFileXLSX, utils } from 'xlsx';
import {
    fetchGetUTRListPayload,
    fetchUTRInfoPayload,
    fetchUTRIngestionPayload,
} from '../../network/createPayload';
import apiRepository from '../../network/apiRepository';
import { sagaActions } from '../../reduxInit/sagaActions';
import { History } from 'history';
import {
    setUTRList,
    setPaymentError,
    setPaymentLoading,
    setUTRdetails,
    setPaymentAdviceLoading,
    setIngestionLoading,
    resetUTRDetails,
} from './paymentSlice';
import { setSearchParams } from '../../common/commonSlice';
import {
    IResponse,
    ActionResult,
    IUTRPayload,
    Error,
    IIngestionResponse,
    IPaymentIngestionInfo,
} from './paymentTypes';
import { setDialogOpen } from '../../common/commonSlice';

function* handleAPIErrors(e: any) {
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

export function* fetchPaymentDetails(
    history: History,
    action: ActionResult<IUTRPayload>
) {
    //const vendorId = 'VNDR-1526001151'; //VNDR-1526007917
    const vendorId = localStorage.getItem('vendorId') as string;
    try {
        const { payload } = action;
        if (payload) payload.vendorId = vendorId;
        if (payload?.pageNumber === 0) {
            yield put(setPaymentLoading());
        }
        const result: IResponse = yield call(
            apiRepository.getUTRList,
            fetchGetUTRListPayload(payload)
        );
        if (
            payload?.searchText ||
            payload?.dateClicked ||
            payload?.pageNumber === 0
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
        yield call(handleAPIErrors, e);
    }
}

export function* fetchUTRDetails(action: ActionResult<IUTRPayload>) {
    const vendorId = localStorage.getItem('vendorId') as string;
    yield put(resetUTRDetails());
    //const vendorId = 'VNDR-1526001151';
    try {
        const { payload } = action;
        if (payload) payload.vendorId = vendorId;
        yield put(setPaymentAdviceLoading());
        const result: IResponse = yield call(
            apiRepository.getUTRInfo,
            fetchUTRInfoPayload(payload)
        );
        yield put(setUTRdetails(result));
    } catch (e: any) {
        console.log(e);
        yield call(handleAPIErrors, e);
    }
}

function createIngestionData(
    result: IIngestionResponse
): IPaymentIngestionInfo[] {
    const newData = result.paymentInfoLineItems!.map(
        (item: IPaymentIngestionInfo) => {
            const newItem: IPaymentIngestionInfo = {} as IPaymentIngestionInfo;
            Object.keys(item).forEach((key) => {
                const newKey =
                    result.paymentInfoHeaders![key as keyof typeof newItem];
                if (newKey) {
                    // @ts-ignore
                    newItem[newKey] = item[key as keyof typeof item];
                }
            });
            return newItem;
        }
    );
    return newData;
}

function* createAndDownloadFile(
    data: IPaymentIngestionInfo[],
    fileName: string | undefined
) {
    try {
        const worksheet = utils.json_to_sheet(data);
        const workbook = utils.book_new();
        utils.book_append_sheet(workbook, worksheet, 'Settlement Details');
        writeFileXLSX(workbook, `${fileName}.xlsx`, { compression: true });
    } catch (err) {
        console.log('error in creating sheet: ', err);
        const dialogPayload = {
            title: 'Something went wrong',
            content: 'Please try again after some time or contact support.',
        };
        yield put(setDialogOpen(dialogPayload));
    }
}

export function* fetchUTRIngestion(action: ActionResult<IUTRPayload>) {
    const vendorId = localStorage.getItem('vendorId') as string;
    //const vendorId = 'VNDR-1526001151';
    try {
        const { payload } = action;
        if (payload) payload.vendorId = vendorId;
        yield put(setIngestionLoading(true));
        const result: IIngestionResponse = yield call(
            apiRepository.getUTRIngestion,
            fetchUTRIngestionPayload(payload)
        );

        const newData: IPaymentIngestionInfo[] = yield call(
            createIngestionData,
            result
        );
        yield call(createAndDownloadFile, newData, result.ingestionFileName);
        yield put(setIngestionLoading(false));
    } catch (e: any) {
        console.log(e);
        yield call(handleAPIErrors, e);
    }
}

export default function* paymentSaga(history: History) {
    yield takeLatest(
        sagaActions.FETCH_PAYMENT_DETAILS,
        fetchPaymentDetails,
        history
    );
    yield takeLatest(sagaActions.FETCH_UTR_DETAILS, fetchUTRDetails);
    yield takeLatest(sagaActions.FETCH_UTR_INGESTION, fetchUTRIngestion);
}
