import { RootState } from '../../reduxInit/store';
import { UserDetails } from './authTypes';

const getUserDetails = (state: RootState) => {
    const storedUserDetails = localStorage.getItem('userDetails') as string;
    const userDetails: UserDetails = JSON.parse(storedUserDetails);
    return userDetails;
};

export { getUserDetails };
