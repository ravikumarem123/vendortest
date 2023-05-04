import type { RootState } from '../../reduxInit/store';

const getPaymentList = (state: RootState) => {
    return state.payment.paymentList;
};

const getIsPaymentLoading = (state: RootState) => {
    return state.payment.loading;
};

const getIsPaymentListHasmore = (state: RootState) => {
    return state.payment.hasMore;
};

const getPaymentError = (state: RootState) => {
    return state.payment.error;
};

const getDefaultTime = (state: RootState) => {
    return {
        startTime: state.payment.defaultStartTime,
        endTime: state.payment.defaultEndTime,
    };
};

const getSelectedUtrInfo = (state: RootState) => {
	return state.payment.utrDetails;
};

const getIsPaymentAdviceLoading = (state: RootState) => {
	return state.payment.paymentAdviceLoading;
};

const getIsDownloadIngestionLoading = (state: RootState) => {
	return state.payment.isIngestionLoading;
};

export {
    getPaymentList,
    getIsPaymentLoading,
    getPaymentError,
    getDefaultTime,
    getIsPaymentListHasmore,
	getSelectedUtrInfo,
	getIsPaymentAdviceLoading,
	getIsDownloadIngestionLoading,
};
