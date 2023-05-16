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
	activeScreen: string;
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
	isAuthLoading: boolean;
};

export interface ISetPasswordProps {
	password: string;
	setPassword: Dispatch<SetStateAction<string>>;
	verifyPassword: string;
	setVerifyPassword: Dispatch<SetStateAction<string>>;
	showPassword: boolean;
	setShowPassword: Dispatch<SetStateAction<boolean>>;
	handlesetPasswordSubmit: FormEventHandler<HTMLFormElement>;
	isAuthLoading: boolean;
};

export interface IEnterPasswordProps {
	password: string,
	setPassword:  Dispatch<SetStateAction<string>>;
	showPassword: boolean;
	setShowPassword: Dispatch<SetStateAction<boolean>>;
	handleEnterPasswordSubmit: FormEventHandler<HTMLFormElement>;
	isAuthLoading: boolean;
};

export const AUTH_SCREENS = {
	LOGIN_WITH_OTP_AND_SET_PWD_PAGE: 'LOGIN_WITH_OTP_AND_SET_PWD_PAGE',
    VALIDATE_OTP_PAGE: 'VALIDATE_OTP_PAGE',
    LOGIN_WITH_PWD_OR_OTP_PAGE: 'LOGIN_WITH_PWD_OR_OTP_PAGE',
    FORGOT_PWD_PAGE: 'FORGOT_PWD_PAGE',
    SET_PWD_PAGE: 'SET_PWD_PAGE',
    VALIDATE_PWD_PAGE: 'VALIDATE_PWD_PAGE',
    HOME_PAGE: 'HOME_PAGE'
};

export interface ISelectAuthTypeProps {
	email: string;
	editFn: () => void;
	isAuthLoading: boolean;
};

export interface IEnterOtpProps{
	otp: string;
	setOtp: Dispatch<SetStateAction<string>>;
	handleOtpSubmit: FormEventHandler<HTMLFormElement>;
	isAuthLoading: boolean;
};