import type { RootState } from '../../reduxInit/store';

const getPaymentList = (state: RootState) => {
    return state.payment.paymentList;
};

const getLastReadPayment = (state: RootState) => {
    return state.payment.prevPageLastPaymentId;
};

const getIsPaymentLoading = (state: RootState) => {
    return state.payment.loading;
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

export {
    getPaymentList,
    getLastReadPayment,
    getIsPaymentLoading,
    getPaymentError,
    getDefaultTime,
};
