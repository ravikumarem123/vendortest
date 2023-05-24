import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxInit/hooks';
import sagaActions from '../../reduxInit/sagaActions';
import AuthContainer from './AuthContainer';
import {
    EnterOtpScreen,
    HomePageScreen,
    LoginWithPassword,
    SelectAuthTypeScreen,
    SetPasswordScreen,
} from './AuthScreen.tsx';
import { AUTH_SCREENS, LOGIN_PURPOSE } from './authTypes';
import { sendEvents, events } from '../../appEvents';
import { getActiveScreen, getIsAuthLoading } from './authSelector';
import { setActiveAuthScreen } from './authSlice';
import { setDialogOpen } from '../../common/commonSlice';
import './auth.css';

const Login = () => {
    const [emailId, setEmailId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [timer, setTimer] = useState(30);
    const [isForgotPwdClick, setIsForgotPwdClick] = useState(false);
    const [verifyPassword, setVerifyPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [otp, setOtp] = useState('');
    const activeScreen = useAppSelector(getActiveScreen);
    const isAuthLoading = useAppSelector(getIsAuthLoading);
    const dispatch = useAppDispatch();

    const handleEmailSubmit = (e: FormEvent) => {
        e.preventDefault();
        const payload = {
            emailId,
        };
        if (emailId) {
            sendEvents(events.AUTH.ON_CLICK_VERIFY_EMAIL, {
                email: emailId,
            });
            dispatch({ type: sagaActions.AUTH.VERIFY_EMAIL, payload });
        }
    };

    const handleClickOtpLogin = () => {
        let loginPurpose = LOGIN_PURPOSE.LOGIN;
        if (activeScreen === AUTH_SCREENS.VALIDATE_PWD_PAGE) {
            loginPurpose = LOGIN_PURPOSE.SET_PASSWORD;
        }
        sendEvents(events.AUTH.ON_SELECT_EMAIL_OTP, {
            email: emailId,
            authenticalFlow: loginPurpose,
        });
        dispatch({
            type: sagaActions.AUTH.GENERATE_OTP,
            payload: { loginPurpose },
        });
    };

    const handleClickPwdLogin = () => {
        sendEvents(events.AUTH.ON_SELECT_SET_PASSWORD, {
            email: emailId,
            authenticalFlow: LOGIN_PURPOSE.SET_PASSWORD,
        });
        dispatch({
            type: sagaActions.AUTH.GENERATE_OTP,
            payload: { loginPurpose: LOGIN_PURPOSE.SET_PASSWORD },
        });
    };

    const handleSubmitLoginWithPwd = (e: FormEvent) => {
        e.preventDefault();
        const payload = {
            password,
        };
        if (password) {
            sendEvents(events.AUTH.ON_SUBMIT_PASSWORD, { email: emailId });
            dispatch({ type: sagaActions.AUTH.VALIDATE_PASSWORD, payload });
            setIsForgotPwdClick(false);
        }
    };

    const handleOtpSubmit = (e: FormEvent) => {
        e.preventDefault();
        const payload = {
            otp,
        };
        if (otp) {
            sendEvents(events.AUTH.ON_SUBMIT_OTP, {
                email: emailId,
                screen: activeScreen,
            });
            dispatch({ type: sagaActions.AUTH.VERIFY_OTP, payload });
        }
    };

    const handleResendOtp = () => {
        sendEvents(events.AUTH.ON_CLICK_RESEND_OTP, { email: emailId });
        dispatch({ type: sagaActions.AUTH.RESEND_OTP });
        if (!timer) {
            setTimer(30);
        }
        setOtp('');
    };

    const handlesetPasswordSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (password.length < 6) {
            dispatch(
                setDialogOpen({
                    title: 'Invalid Password',
                    content: 'Use minimum 6 characters for the password',
                })
            );
        } else {
            const payload = {
                password,
                verifyPassword,
            };
            sendEvents(events.AUTH.ON_SUBMIT_SET_PASSWORD, { email: emailId });

            dispatch({ type: sagaActions.AUTH.SET_PASSWORD, payload });
            setPassword('');
            setVerifyPassword('');
        }
    };

    const handleClickEditEmail = () => {
        dispatch(setActiveAuthScreen(AUTH_SCREENS.HOME_PAGE));
        setTimer(30);
    };

    const handleForgotPwdClick = () => {
        dispatch(setActiveAuthScreen(AUTH_SCREENS.VALIDATE_OTP_PAGE));
        sendEvents(events.AUTH.ON_CLICK_FORGOT_PASSWORD, {
            email: emailId,
            authenticationFlow: LOGIN_PURPOSE.RESET_PASSWORD,
        });
        dispatch({
            type: sagaActions.AUTH.GENERATE_OTP,
            payload: { loginPurpose: LOGIN_PURPOSE.RESET_PASSWORD },
        });
        setPassword('');
        setIsForgotPwdClick(true);
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
                        handleResendOtp={handleResendOtp}
                        timer={timer}
                        setTimer={setTimer}
                        isForgotPwdClick={isForgotPwdClick}
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
                        handleForgotPwdClick={handleForgotPwdClick}
                        isForgotPwdClick={isForgotPwdClick}
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
