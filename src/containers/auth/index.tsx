import { SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxInit/hooks';
import sagaActions from '../../reduxInit/sagaActions';
import AuthContainer from './AuthContainer';
import {
    EnterOtpScreen,
    EnterPasswordScreen,
    HomePageScreen,
    LoginWithPassword,
    SelectAuthTypeScreen,
    SetPasswordScreen,
} from './AuthScreen.tsx';
import { AUTH_SCREENS, LOGIN_PURPOSE } from './authTypes';
import { getActiveScreen, getIsAuthLoading } from './authSelector';
import { setActiveAuthScreen } from './authSlice';
import './auth.css';

const Login = () => {
    const [emailId, setEmailId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [verifyPassword, setVerifyPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [otp, setOtp] = useState('');
    const activeScreen = useAppSelector(getActiveScreen);
    const isAuthLoading = useAppSelector(getIsAuthLoading);
    const dispatch = useAppDispatch();

    const handleEmailSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            emailId,
        };
        if (emailId) {
            dispatch({ type: sagaActions.AUTH.VERIFY_EMAIL, payload });
        }
    };

    const handleClickOtpLogin = () => {
        dispatch({
            type: sagaActions.AUTH.GENERATE_OTP,
            payload: { loginPurpose: LOGIN_PURPOSE.LOGIN },
        });
    };

    const handleClickPwdLogin = () => {
        dispatch({
            type: sagaActions.AUTH.GENERATE_OTP,
            payload: { loginPurpose: LOGIN_PURPOSE.FIRST_LOGIN },
        });
    };

    const handleSubmitLoginWithPwd = (e: SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            password,
        };
        if (password) {
            dispatch({ type: sagaActions.AUTH.VALIDATE_PASSWORD, payload });
        }
    };

    const handleOtpSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            otp,
        };
        if (otp) {
            dispatch({ type: sagaActions.AUTH.VERIFY_OTP, payload });
        }
    };

    const handlesetPasswordSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            password,
            verifyPassword,
        };
        if (otp) {
            dispatch({ type: sagaActions.AUTH.SET_PASSWORD, payload });
            setPassword('');
            setVerifyPassword('');
        }
    };

    const handleEnterPasswordSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            password,
        };
        if (password) {
            dispatch({ type: sagaActions.AUTH.VALIDATE_PASSWORD, payload });
        }
    };

    const handleClickEditEmail = () => {
        dispatch(setActiveAuthScreen(AUTH_SCREENS.HOME_PAGE));
    };

    const renderActiveScreen = (): JSX.Element => {
        switch (activeScreen) {
            case AUTH_SCREENS.HOME_PAGE:
                return (
                    <HomePageScreen
                        emailId={emailId}
                        setEmailId={setEmailId}
                        handleEmailSubmit={handleEmailSubmit}
                        isAuthLoading={isAuthLoading}
                    />
                );
            case AUTH_SCREENS.LOGIN_WITH_OTP_AND_SET_PWD_PAGE:
                return (
                    <SelectAuthTypeScreen
                        email={emailId}
                        isAuthLoading={isAuthLoading}
                        editFn={handleClickEditEmail}
                        handleClickOtpLogin={handleClickOtpLogin}
                        handleClickPwdLogin={handleClickPwdLogin}
                    />
                );
            case AUTH_SCREENS.VALIDATE_OTP_PAGE:
                return (
                    <EnterOtpScreen
                        email={emailId}
                        editFn={handleClickEditEmail}
                        otp={otp}
                        setOtp={setOtp}
                        handleOtpSubmit={handleOtpSubmit}
                        isAuthLoading={isAuthLoading}
                    />
                );
            case AUTH_SCREENS.SET_PWD_PAGE:
                return (
                    <SetPasswordScreen
                        password={password}
                        setPassword={setPassword}
                        verifyPassword={verifyPassword}
                        setVerifyPassword={setVerifyPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        handlesetPasswordSubmit={handlesetPasswordSubmit}
                        isAuthLoading={isAuthLoading}
                    />
                );
            case AUTH_SCREENS.VALIDATE_PWD_PAGE:
                return (
                    <EnterPasswordScreen
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        handleEnterPasswordSubmit={handleEnterPasswordSubmit}
                        isAuthLoading={isAuthLoading}
                    />
                );
            case AUTH_SCREENS.LOGIN_WITH_PWD_OR_OTP_PAGE:
                return (
                    <LoginWithPassword
                        email={emailId}
                        editFn={handleClickEditEmail}
                        password={password}
                        setPassword={setPassword}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        isAuthLoading={isAuthLoading}
                        handleClickOtpLogin={handleClickOtpLogin}
                        handleSubmitLoginWithPwd={handleSubmitLoginWithPwd}
                    />
                );
            default:
                return (
                    <HomePageScreen
                        emailId={emailId}
                        setEmailId={setEmailId}
                        handleEmailSubmit={handleEmailSubmit}
                        isAuthLoading={isAuthLoading}
                    />
                );
        }
    };

    return <AuthContainer>{renderActiveScreen()}</AuthContainer>;
};

export default Login;
