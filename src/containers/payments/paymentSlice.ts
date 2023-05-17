import { createSlice } from '@reduxjs/toolkit';
import { PaymentInitialState } from './paymentTypes';

const initialState: PaymentInitialState = {
    paymentList: [],
    loading: true,
    hasMore: true,
    error: null,
    defaultStartTime: null,
    defaultEndTime: null,
    utrDetails: {},
    paymentAdviceLoading: false,
    isIngestionLoading: false,
};

const paymentSlice = createSlice({
    name: 'paymentReducer',
    initialState,
    reducers: {
        setUTRList: (state, { payload }) => {
            if (payload?.fresh) {
                state.paymentList = payload.paymentsInfo;
                state.utrDetails = {};
            } else {
                state.paymentList = [
                    ...state.paymentList,
                    ...payload.paymentsInfo,
                ];
            }
            state.defaultEndTime = payload.endTime;
            state.defaultStartTime = payload.startTime;
            state.loading = false;
            state.hasMore = payload?.hasMoreRecords;
            state.paymentAdviceLoading = false;
            state.isIngestionLoading = false;
            state.error = null;
        },
        setPaymentError: (state, { payload }) => {
            state.loading = false;
            state.paymentAdviceLoading = false;
            state.isIngestionLoading = false;
            state.error = payload;
        },
        setPaymentLoading: (state) => {
            state.loading = true;
        },
        setUTRdetails: (state, { payload }) => {
            state.utrDetails.settledDate = payload.settledDate;
            state.utrDetails.totalAmount = payload.totalAmount;
            state.utrDetails.utr = payload.utr;
            state.utrDetails.items = payload.items;
            state.paymentAdviceLoading = false;
            state.isIngestionLoading = false;
        },
        setPaymentAdviceLoading: (state) => {
            state.paymentAdviceLoading = true;
        },
        setIngestionLoading: (state, { payload }) => {
            state.isIngestionLoading = payload;
        },
        resetUTRDetails: (state) => {
            state.utrDetails = {};
        },
    },
});

export const {
    setUTRList,
    setPaymentError,
    setPaymentLoading,
    setUTRdetails,
    setPaymentAdviceLoading,
    setIngestionLoading,
    resetUTRDetails,
} = paymentSlice.actions;
export default paymentSlice.reducer;
