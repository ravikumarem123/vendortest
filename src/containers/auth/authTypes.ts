import { Dispatch, FormEventHandler, SetStateAction } from "react";

export interface UserDetails {
    vendorId: string;
    businessName: string;
    businessAddress: string;
    gstNumber: string;
}

export interface AuthInitialState {
    emailId: string;
    password: string;
    loading: boolean;
    error: string;
    userDetails: UserDetails;
}

export interface IResponse {
    vendorId: string;
    businessName: string;
    businessAddress: string;
    gstNumber: string;
}

export interface IHomePageProps {
	emailId: string;
	setEmailId: Dispatch<SetStateAction<string>>;
	handleEmailSubmit: FormEventHandler<HTMLFormElement>;
};

export interface ISetPasswordProps {
	showPassword: boolean;
	setShowPassword:  Dispatch<SetStateAction<boolean>>;
};

export interface ISelectAuthTypeProps {
	email: string;
	editFn: () => void;
};

export interface IEnterOtpProps{
	otp: string;
	setOtp: Dispatch<SetStateAction<string>>;
	handleOtpSubmit: FormEventHandler<HTMLFormElement>;
};