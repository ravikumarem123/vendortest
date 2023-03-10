import { createSlice } from '@reduxjs/toolkit';
import { PodInitialState } from './podTypes';

const initialState: PodInitialState = {
    invoiceList: [],
    loading: true,
    prevPageLastInvId: '',
    hasMore: true,
    error: null,
    searchText: '',
    searchClicked: false,
};

const podSlice = createSlice({
    name: 'podReducer',
    initialState,
    reducers: {
        setPodDetails: (state, { payload }) => {
            if (payload?.fresh) {
                state.invoiceList = payload.invoiceInfoList;
            } else if (
                payload?.prevPageLastInvId &&
                payload?.prevPageLastInvId.length > 1
            ) {
                state.invoiceList = [
                    ...state.invoiceList,
                    ...payload.invoiceInfoList,
                ];
            } else {
                state.invoiceList = payload.invoiceInfoList;
            }
            state.loading = false;
            state.error = null;
            state.hasMore = payload?.prevPageLastInvId ? true : false;
            state.prevPageLastInvId = payload?.prevPageLastInvId;
        },
        setSearchParams: (state, { payload }) => {
            console.log(payload);
            state.searchClicked = payload.clicked;
            state.searchText = payload.text;
        },
        setPodError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        setPodLoading: (state, { payload }) => {
            state.loading = true;
        },
    },
});

export const { setPodDetails, setPodError, setPodLoading, setSearchParams } =
    podSlice.actions;
export default podSlice.reducer;
