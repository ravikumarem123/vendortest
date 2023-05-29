import { createSlice } from '@reduxjs/toolkit';
import { PodInitialState } from './podTypes';

const initialState: PodInitialState = {
    invoiceList: [],
    loading: true,
    prevPageLastInvId: null,
    hasMore: true,
    error: null,
    defaultStartTime: null,
    defaultEndTime: null,
};

const podSlice = createSlice({
    name: 'podReducer',
    initialState,
    reducers: {
        setPodDetails: (state, { payload }) => {
            if (payload?.fresh) {
                state.invoiceList = payload.podInfoList;
            } else if (
                payload?.prevPageLastInvId &&
                payload?.prevPageLastInvId.length > 1
            ) {
                state.invoiceList = [
                    ...state.invoiceList,
                    ...payload.podInfoList,
                ];
            } else {
                state.invoiceList = [
                    ...state.invoiceList,
                    ...payload.podInfoList,
                ];
            }
            state.defaultEndTime = payload.endTime;
            state.defaultStartTime = payload.startTime;
            state.loading = false;
            state.error = null;
            state.hasMore = !!payload?.prevPageLastInvId;
            state.prevPageLastInvId = payload?.prevPageLastInvId;
        },
        setPodError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        setPodLoading: (state) => {
            state.loading = true;
        },
    },
});

export const { setPodDetails, setPodError, setPodLoading } = podSlice.actions;
export default podSlice.reducer;
