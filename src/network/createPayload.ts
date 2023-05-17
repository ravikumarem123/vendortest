import { Md5 } from 'ts-md5';
import { Props } from '../containers/proofofdelivery/podTypes';
import {
    IUTRDetailsPayload,
    IUTRPayload,
} from '../containers/payments/paymentTypes';

const getJCLedgerPayload = (
    businessId: string,
    pageNumber: number,
    pageSize = 10
) => {
    return `businessId=${businessId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
};

const fetchPodPayload = (params: Props) => {
    const {
        vendorId,
        pageSize,
        dateClicked,
        lastReadInvoice,
        startTime,
        endTime,
        searchText,
    } = params;

    return {
        vendorId,
        pageSize: pageSize || (dateClicked ? 20 : 10),
        prevPageLastInvId: lastReadInvoice,
        startTime,
        endTime,
        invoiceNumber: searchText,
    };
};

interface ILoginParams {
    emailId: string;
    password: string;
}

const fetchLoginPayload = (params: ILoginParams) => {
    const { emailId, password } = params;

    return {
        emailId,
        // hashPassword: password,
        hashPassword: Md5.hashStr(password),
    };
};

const fetchGetUTRListPayload = (params: IUTRPayload) => {
    const { vendorId, startTime, endTime, pageNumber, searchText } = params;

    return {
        vendorId,
        startTime,
        endTime,
        pageNumber,
        utr: searchText,
    };
};

const fetchUTRInfoPayload = (params: IUTRDetailsPayload) => {
    const { vendorId, utr } = params;
    return { vendorId, utr };
};

const fetchUTRIngestionPayload = (params: IUTRDetailsPayload) => {
    const { vendorId, utr } = params;

    return {
        vendorId,
        utr,
    };
};

const fetchInvoicePayload = (params: Props) => {
    const {
        vendorId,
        pageSize,
        dateClicked,
        lastReadInvoice,
        startTime,
        endTime,
        searchText,
    } = params;

    return {
        vendorId,
        pageSize: pageSize || (dateClicked ? 20 : 10),
        prevPageLastInvId: lastReadInvoice,
        startTime,
        endTime,
        invoiceNumber: searchText,
    };
};

export {
    getJCLedgerPayload,
    fetchPodPayload,
    fetchLoginPayload,
    fetchGetUTRListPayload,
    fetchUTRInfoPayload,
    fetchUTRIngestionPayload,
    fetchInvoicePayload,
};
