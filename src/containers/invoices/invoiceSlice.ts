import { createSlice } from '@reduxjs/toolkit';
import { InvoiceInitialState } from './invoicetypes';

const initialState: InvoiceInitialState = {
    invoiceList: [],
    loading: true,
    prevPageLastInvId: null,
    hasMore: true,
    error: null,
    defaultStartTime: null,
    defaultEndTime: null,
};

const invoiceSlice = createSlice({
    name: 'invoiceReducer',
    initialState,
    reducers: {
        setInvoiceDetails: (state, { payload }) => {
            if (payload?.fresh) {
                state.invoiceList = payload.invoicesInfo;
            } else if (
                payload?.prevPageLastInvId &&
                payload?.prevPageLastInvId.length > 1
            ) {
                state.invoiceList = [
                    ...state.invoiceList,
                    ...payload.invoicesInfo,
                ];
            } else {
                state.invoiceList = [
                    ...state.invoiceList,
                    ...payload.invoicesInfo,
                ];
            }
            state.defaultEndTime = payload.dataEndDate;
            state.defaultStartTime = payload.dataStartDate;
            state.loading = false;
            state.error = null;
            state.hasMore = !!payload?.prevPageLastInvId;
            state.prevPageLastInvId = payload?.prevPageLastInvId;
        },
        setInvoiceError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        setInvoiceLoading: (state) => {
            state.loading = true;
        },
    },
});

export const { setInvoiceDetails, setInvoiceError, setInvoiceLoading } =
    invoiceSlice.actions;
export default invoiceSlice.reducer;
