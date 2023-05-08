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

export interface Invoice {
    number: string;
    podUrl: string;
    invoiceDate: Dayjs;
    deliveryDate: Dayjs;
    amount: number;
    buyerInfo: IBuyerInfo;
}

export interface PodInitialState {
    invoiceList: Array<Invoice>;
    loading: boolean;
    prevPageLastInvId: string | null;
    hasMore: boolean;
    error: null | string;
    defaultStartTime?: Dayjs | null;
    defaultEndTime?: Dayjs | null;
}
export interface IResponse {
    success: boolean;
    statusCode: number;
    error: string | null;
    data: object;
    fresh?: boolean;
}

export interface Props {
    searchText?: string;
    startTime?: Dayjs;
    endTime?: Dayjs;
    dateClicked?: boolean;
    lastReadInvoice?: string;
    pageSize?: number;
    invoiceNumber?: string;
    vendorId?: string;
}

export interface ActionResult<T> extends Action<string> {
    type: string;
    payload: T;
}

export interface Error {
    error: string;
}
