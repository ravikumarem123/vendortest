import { createSlice } from '@reduxjs/toolkit';
import { AuthInitialState } from './authTypes';

const initialState: AuthInitialState = {
    emailId: '',
    password: '',
    loading: false,
    error: '',
    userDetails: {
        vendorId: '',
        businessAddress: '',
        businessName: '',
        gstNumber: '',
    },
};

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setAuthdetails: (state, { payload }) => {
            state.userDetails = payload;
        },
        setAuthError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        setAuthLoading: (state, { payload }) => {
            state.loading = true;
        },
    },
});

export const { setAuthdetails, setAuthError, setAuthLoading } =
    authSlice.actions;
export default authSlice.reducer;
