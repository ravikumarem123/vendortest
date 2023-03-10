import { Dayjs } from 'dayjs';

const getJCLedgerPayload = (
    businessId: string,
    pageNumber: number,
    pageSize: number = 10
) => {
    return `businessId=${businessId}&pageNumber=${pageNumber}&pageSize=${pageSize}`;
};

interface IInvoiceParams {
    vendorId: string;
    pageSize: number;
    startTime?: Dayjs;
    endTime?: Dayjs;
    lastReadInvoice?: string;
    invoiceNumber?: string;
}

const fetchInvoicePayload = (params: IInvoiceParams) => {
    return {
        vendorId: params.vendorId,
        pageSize: params.pageSize,
        prevPageLastInvId: params.lastReadInvoice,
        startTime: params.startTime,
        endTime: params.endTime,
        invoiceNumber: params.invoiceNumber,
    };
};

export { getJCLedgerPayload, fetchInvoicePayload };
