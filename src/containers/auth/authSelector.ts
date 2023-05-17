import { RootState } from '../../reduxInit/store';
import { UserDetails } from './authTypes';

const getUserDetails = (state: RootState) => {
    const storedUserDetails = localStorage.getItem('userDetails') as string;
    const userDetails: UserDetails = JSON.parse(storedUserDetails);
    return userDetails;
};

const getVendorId = (state: RootState) => {
	const userDetails = getUserDetails(state);
	return userDetails?.vendorId;
};

const getActiveScreen = (state: RootState) => {
	return state.auth.activeScreen;
};

const getIsAuthLoading = (state: RootState) => {
	return state.auth.loading;
};

const getUserEmail = (state: RootState) => {
	return state.auth.emailId;
};

const getAuthSessionId = (state: RootState) => {
	return state.auth.authSession;
};

export { 
	getUserDetails, 
	getActiveScreen, 
	getIsAuthLoading, 
	getUserEmail, 
	getAuthSessionId, 
	getVendorId
};
