interface UserDetails {
    vendorId: string;
    businessName: string;
    businessAddress: string;
    gstNumber: string;
}

interface AuthInitialState {
    emailId: string;
    password: string;
    loading: boolean;
    error: string;
    userDetails: UserDetails;
}

interface IResponse {
    vendorId: string;
    businessName: string;
    businessAddress: string;
    gstNumber: string;
}

export type { AuthInitialState, UserDetails, IResponse };
