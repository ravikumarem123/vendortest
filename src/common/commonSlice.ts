import { createSlice } from '@reduxjs/toolkit';
import { ICommonState } from './commonTypes';

const initialState: ICommonState = {
    dialogOpen: false,
    dialogTitle: '',
    dialogContent: '',
    dialogLogout: false,
    searchText: '',
    searchClicked: false,
    fromDate: null,
    toDate: null,
    dateClicked: false,
};

const commonSlice = createSlice({
    name: 'commonReducer',
    initialState,
    reducers: {
        setDialogOpen: (state, { payload }) => {
            state.dialogTitle = payload.title;
            state.dialogContent = payload.content;
            state.dialogOpen = true;
            state.dialogLogout = payload.logout;
        },
        setDialogClose: (state) => {
            state.dialogTitle = '';
            state.dialogContent = '';
            state.dialogOpen = false;
        },
        setSearchParams: (state, { payload }) => {
            state.searchClicked = payload.clicked;
            state.searchText = payload.text;
        },
        setFromDate: (state, { payload }) => {
            state.fromDate = payload.fromDate;
        },
        setToDate: (state, { payload }) => {
            state.toDate = payload.toDate;
        },
        setDateClicked: (state, { payload }) => {
            state.dateClicked = payload;
        },
		resetSearchState: (state) => {
			state.searchClicked = false;
			state.searchText = '';
			state.fromDate = null;
			state.toDate = null;
			state.dateClicked = false;

		},
    },
});

export const {
    setDialogOpen,
    setDialogClose,
    setSearchParams,
    setFromDate,
    setToDate,
    setDateClicked,
	resetSearchState,
} = commonSlice.actions;
export default commonSlice.reducer;
