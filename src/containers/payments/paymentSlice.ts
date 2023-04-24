import { createSlice } from '@reduxjs/toolkit';
import { PaymentInitialState } from './paymentTypes';

const initialState: PaymentInitialState = {
    paymentList: [],
    loading: true,
    prevPageLastPaymentId: null,
    hasMore: true,
    error: null,
    defaultStartTime: null,
    defaultEndTime: null,
};

const paymentSlice = createSlice({
    name: 'paymentReducer',
    initialState,
    reducers: {
        setUTRList: (state, { payload }) => {
            if (payload?.fresh) {
                state.paymentList = payload.invoiceInfoList;
            } else if (
                payload?.prevPageLastInvId &&
                payload?.prevPageLastInvId.length > 1
            ) {
                state.paymentList = [
                    ...state.paymentList,
                    ...payload.invoiceInfoList,
                ];
            } else {
                state.paymentList = [
                    ...state.paymentList,
                    ...payload.invoiceInfoList,
                ];
            }
            state.defaultEndTime = payload.endTime;
            state.defaultStartTime = payload.startTime;
            state.loading = false;
            state.error = null;
            state.hasMore = payload?.prevPageLastInvId ? true : false;
            state.prevPageLastPaymentId = payload?.prevPageLastInvId;
        },
        setPaymentError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        setPaymentLoading: (state) => {
            state.loading = true;
        },
    },
});

export const { setUTRList, setPaymentError, setPaymentLoading } =
    paymentSlice.actions;
export default paymentSlice.reducer;
