import { UserDetails } from './authTypes';

const getUserDetails = () => {
    const storedUserDetails = localStorage.getItem('userDetails') as string;
    const userDetails: UserDetails = JSON.parse(storedUserDetails);
    return userDetails;
};

export default getUserDetails;
