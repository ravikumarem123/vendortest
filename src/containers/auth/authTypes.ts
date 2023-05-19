import { Dispatch, FormEventHandler, SetStateAction } from 'react';

export interface UserDetails {
    vendorId: string;
    primaryPhoneNumber: string;
    primaryEmail: string;
    businessName: string;
    displayName: string;
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
    otp: string;
    authSession: string;
}

export interface IHomePageProps {
    emailId: string;
    setEmailId: Dispatch<SetStateAction<string>>;
    handleEmailSubmit: FormEventHandler<HTMLFormElement>;
    isAuthLoading: boolean;
}

export interface ISetPasswordProps {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    verifyPassword: string;
    setVerifyPassword: Dispatch<SetStateAction<string>>;
    showPassword: boolean;
    setShowPassword: Dispatch<SetStateAction<boolean>>;
    handlesetPasswordSubmit: FormEventHandler<HTMLFormElement>;
    isAuthLoading: boolean;
}

export interface IEnterPasswordProps {
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    showPassword: boolean;
    setShowPassword: Dispatch<SetStateAction<boolean>>;
    handleEnterPasswordSubmit: FormEventHandler<HTMLFormElement>;
    isAuthLoading: boolean;
}

export const AUTH_SCREENS = {
    LOGIN_WITH_OTP_AND_SET_PWD_PAGE: 'LOGIN_WITH_OTP_AND_SET_PWD_PAGE',
    VALIDATE_OTP_PAGE: 'VALIDATE_OTP_PAGE',
    LOGIN_WITH_PWD_OR_OTP_PAGE: 'LOGIN_WITH_PWD_OR_OTP_PAGE',
    FORGOT_PWD_PAGE: 'FORGOT_PWD_PAGE',
    SET_PWD_PAGE: 'SET_PWD_PAGE',
    VALIDATE_PWD_PAGE: 'VALIDATE_PWD_PAGE',
    HOME_PAGE: 'HOME_PAGE',
};

export interface ISelectAuthTypeProps {
    email: string;
    editFn: () => void;
    isAuthLoading: boolean;
    handleClickOtpLogin: () => void;
    handleClickPwdLogin: () => void;
}

export interface ILoginWithPasswordProps {
    email: string;
    editFn: () => void;
    password: string;
    setPassword: Dispatch<SetStateAction<string>>;
    isAuthLoading: boolean;
    showPassword: boolean;
    setShowPassword: Dispatch<SetStateAction<boolean>>;
    handleClickOtpLogin: () => void;
    handleSubmitLoginWithPwd: FormEventHandler<HTMLFormElement>;
    handleForgotPwdClick: () => void;
    isForgotPwdClick: boolean;
}

export interface IEnterOtpProps {
    email: string;
    editFn: () => void;
    otp: string;
    setOtp: Dispatch<SetStateAction<string>>;
    handleOtpSubmit: FormEventHandler<HTMLFormElement>;
    isAuthLoading: boolean;
    handleResendOtp: () => void;
    timer: number;
    setTimer: Dispatch<SetStateAction<number>>;
    isForgotPwdClick: boolean;
}
export interface IResponse {
    vendorId: string;
    businessName: string;
    businessAddress: string;
    gstNumber: string;
}

export interface IVerifyEmailResponse {
    emailId: string;
    nextPage: string;
    sessionId: string;
}

export interface IGenerateOtpResponse {
    nextPage: string;
    sessionId: string;
}

export interface IValidateOtpResponse {
    nextPage: string;
    userData: {
        accessToken: string;
        profile: UserDetails;
    };
}

export interface ISetPasswordResponse {
    nextPage: string;
}

export const LOGIN_PURPOSE = {
    LOGIN: 'LOGIN',
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    SET_PASSWORD: 'SET_PASSWORD',
    RESET_PASSWORD: 'RESET_PASSWORD',
};

export type ScreenName =
    | 'LOGIN_WITH_OTP_AND_SET_PWD_PAGE'
    | 'LOGIN_WITH_PWD_OR_OTP_PAGE'
    | string;
