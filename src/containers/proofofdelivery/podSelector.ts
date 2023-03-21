import type { RootState } from '../../reduxInit/store';

const isSearchClicked = (state: RootState) => {
    return state.pod.searchClicked;
};

const getSearchedText = (state: RootState) => {
    return state.pod.searchText;
};

const getInvoiceList = (state: RootState) => {
    return state.pod.invoiceList;
};

const getLastReadInvoice = (state: RootState) => {
    return state.pod.prevPageLastInvId;
};

const getIsInvoiceLoading = (state: RootState) => {
    return state.pod.loading;
};

const getPodError = (state: RootState) => {
    return state.pod.error;
};

const getDefaultTime = (state: RootState) => {
    return {
        startTime: state.pod.defaultStartTime,
        endTime: state.pod.defaultEndTime,
    };
};

export {
    isSearchClicked,
    getSearchedText,
    getInvoiceList,
    getLastReadInvoice,
    getIsInvoiceLoading,
    getPodError,
    getDefaultTime,
};
