import { createSlice } from '@reduxjs/toolkit';
import { ICommonState } from './commonTypes';

const initialState: ICommonState = {
    dialogOpen: false,
    dialogTitle: '',
    dialogContent: '',
    dialogLogout: false,
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
    },
});

export const { setDialogOpen, setDialogClose } = commonSlice.actions;
export default commonSlice.reducer;
