import { RootState } from '../reduxInit/store';

const isSearchClicked = (state: RootState) => {
    return state.common.searchClicked;
};

const getSearchedText = (state: RootState) => {
    return state.common.searchText;
};

const getFromDate = (state: RootState) => {
    return state.common.fromDate;
};

const getToDate = (state: RootState) => {
    return state.common.toDate;
};

const getDialogDetails = (state: RootState) => {
    return {
        title: state.common.dialogTitle,
        content: state.common.dialogContent,
        open: state.common.dialogOpen,
        logout: state.common.dialogLogout,
    };
};

export {
    getDialogDetails,
    isSearchClicked,
    getSearchedText,
    getFromDate,
    getToDate,
};
