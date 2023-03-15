import { Dayjs } from 'dayjs';
import { Md5 } from 'ts-md5';
import { Props } from '../containers/proofofdelivery/podTypes';

const getJCLedgerPayload = (
    businessId: string,
    pageNumber: number,
    pageSize: number = 10
) => {
    return `businessId=${businessId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
};

//interface IInvoiceParams {
//    vendorId: string;
//    pageSize: number;
//    startTime?: Dayjs;
//    endTime?: Dayjs;
//    lastReadInvoice?: string;
//    invoiceNumber?: string;
//    dateClicked?: string;
//    searchtext?: string;
//}

const fetchInvoicePayload = (params: Props) => {
    return {
        vendorId: params.vendorId,
        pageSize: params.pageSize
            ? params.pageSize
            : params.dateClicked
            ? 20
            : 10,
        prevPageLastInvId: params.lastReadInvoice,
        startTime: params.startTime,
        endTime: params.endTime,
        invoiceNumber: params.searchText,
    };
};

interface ILoginParams {
    emailId: string;
    password: string;
}

const fetchLoginPayload = (params: ILoginParams) => {
    return {
        emailId: params.emailId,
        //hashPassword: params.password,
        hashPassword: Md5.hashStr(params.password),
    };
};

export { getJCLedgerPayload, fetchInvoicePayload, fetchLoginPayload };
