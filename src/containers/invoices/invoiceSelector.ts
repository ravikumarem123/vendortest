import type { RootState } from '../../reduxInit/store';

const getInvoiceList = (state: RootState) => {
    return state.invoice.invoiceList;
};

const getLastReadInvoice = (state: RootState) => {
    return state.invoice.prevPageLastInvId;
};

const getIsInvoiceLoading = (state: RootState) => {
    return state.invoice.loading;
};

const getInvoiceError = (state: RootState) => {
    return state.invoice.error;
};

const getDefaultTime = (state: RootState) => {
    return {
        startTime: state.invoice.defaultStartTime,
        endTime: state.invoice.defaultEndTime,
    };
};

export {
    getInvoiceList,
    getLastReadInvoice,
    getIsInvoiceLoading,
    getInvoiceError,
    getDefaultTime,
};
