import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchClicked: false,
    transactionList: [],
    walletId: '',
    walletOwnerId: '',
    loading: false,
    hasMore: false,
    pullTime: 0,
    error: null,
};

const podSlice = createSlice({
    name: 'podReducer',
    initialState,
    reducers: {
        setPodDetails: (state, { payload }) => {
            state.error = null;
        },
        setSearchClicked: (state, { payload }) => {
            state.searchClicked = payload;
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

export const { setPodDetails, setPodError, setPodLoading, setSearchClicked } =
    podSlice.actions;
export default podSlice.reducer;
