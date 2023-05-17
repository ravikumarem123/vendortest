import { Dayjs } from 'dayjs';
import { Action } from 'redux';

export interface VendorAddress {
    addressCity: null | string;
    addressLandmark: null | string;
    addressLine: null | string;
    addressLocality: null | string;
    addressPincode: null | string;
    buyerName: null | string;
}

export interface IBuyerInfo {
    name: string;
    addressDetails: string;
}

export interface IUTR {
    utr: string;
    settledDate: string;
    amount: string;
}

export interface IUTRItem {
    amount: number;
    title: string;
    credit?: string;
    debit?: string;
}

export interface IPaymentIngestionInfo {
    debitNoteType: null | string;
    documentCreatedDate: Dayjs | null;
    documentNumber: number;
    documentType: string;
    excessPaidInPrevPayment: number;
    excessPaidUtrId: string | null;
    linkedInvoiceCreatedDate: Dayjs | null;
    linkedInvoiceNumber: number | null;
    netInvoiceAmount: number | null;
    netSettledAmount: number | null;
    settledDate: number | null;
    tds: number | null;
    transactionRemark: string | null;
    utr: string;
}

export interface PaymentInitialState {
    paymentList: Array<IUTR>;
    loading: boolean;
    hasMore: boolean;
    error: null | string;
    defaultStartTime?: Dayjs | null;
    defaultEndTime?: Dayjs | null;
    utrDetails: {
        settledDate?: string;
        utr?: string;
        totalAmount?: number | null;
        items?: Array<IUTRItem>;
    };
    paymentAdviceLoading: boolean;
    isIngestionLoading: boolean;
}

// ingestionData: {
//	paymentInfoHeaders?: IPaymentIngestionInfo,
//	paymentInfoLineItems?: Array<IPaymentIngestionInfo>
// }
export interface IResponse {
    success: boolean;
    statusCode: number;
    error: string | null;
    data: object;
    fresh?: boolean;
}

export interface IIngestionResponse {
    paymentInfoHeaders?: IPaymentIngestionInfo;
    paymentInfoLineItems?: Array<IPaymentIngestionInfo>;
    ingestionFileName?: string;
}

export interface IUTRPayload {
    vendorId: string;
    startTime?: Dayjs;
    endTime?: Dayjs;
    pageNumber?: number;
    utr?: string;
    dateClicked?: boolean;
    searchText?: string;
}

export interface IUTRDetailsPayload {
    vendorId: string;
    utr?: string;
}

export interface ActionResult<T> extends Action<string> {
    type: string;
    payload: T;
}

export interface Error {
    error: string;
}

export interface IPaymentPayload {
    pageNumber: number;
    pageSize?: number;
    dateClicked?: boolean;
    fromDate?: Dayjs | null;
    toDate?: Dayjs | null;
    paymentError?: string | null;
}

export interface IFetchDataProps {
    page: number;
    pageSize?: number;
    isDateClicked?: boolean;
}
