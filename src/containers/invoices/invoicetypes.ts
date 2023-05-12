import { Dayjs } from 'dayjs';
import { Action } from 'redux';

export interface Invoice {
	documentUrl: string;
	invoiceAmount: string;
	invoiceDate: string;
	invoiceNumber: string;
	paymentInfo?: {
		tds: string;
		debitNoteAmount: string;
		expectedAmount: string;
		paymentStatus: string;
		settlementDetails: string;
	}
	paymentErrorInfo?: {
		tds: string;
		debitNoteAmount: string;
		expectedAmount: string;
		paymentStatus: string;
		settlementDetails: string;
	}
}

export interface InvoiceInitialState {
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

export interface InvoiceProps {
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

export interface IFetchDataProps{
	isDateClicked?: boolean;
	sendLastInvoice?: boolean;
	pageSize?: number;
}
