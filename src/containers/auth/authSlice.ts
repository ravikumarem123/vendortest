import { createSlice } from '@reduxjs/toolkit';
import { AUTH_SCREENS, AuthInitialState } from './authTypes';

const initialState: AuthInitialState = {
    emailId: '',
    password: '',
    loading: false,
    error: '',
	otp: '',
	authSession: '',
    userDetails: {
        vendorId: '',
        businessAddress: '',
        displayName: '',
        primaryEmail: '',
		primaryPhoneNumber: '',
		businessName: '',
		gstNumber: '',
    },
	activeScreen: AUTH_SCREENS.HOME_PAGE,
};

const authSlice = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        setAuthdetails: (state, { payload }) => {
            state.userDetails = payload;
			state.loading = false;
			state.error = '';
			state.emailId =  '';
    		state.password =  '';
			state.activeScreen = AUTH_SCREENS.HOME_PAGE;
        },
        setAuthError: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
		setActiveAuthScreen: (state, { payload }) => {
			console.log(payload);
			state.activeScreen = payload;
		},
		setAuthSession: (state, { payload }) => {
			state.authSession = payload;
		},
		setUserEmail: (state, { payload }) => {
			state.emailId = payload;
		},
        setAuthLoading: (state, { payload }) => {
            state.loading = payload;
        },
    },
});

export const { setAuthdetails, setAuthError, setAuthLoading, setActiveAuthScreen, setAuthSession, setUserEmail } =
    authSlice.actions;
export default authSlice.reducer;
