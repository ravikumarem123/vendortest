import { SyntheticEvent, useState } from 'react';
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
import { getActiveScreen, getIsAuthLoading } from './authSelector';
import { setActiveAuthScreen } from './authSlice';
import './auth.css';
import { setDialogOpen } from '../../common/commonSlice';

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
        let loginPurpose = LOGIN_PURPOSE.LOGIN;
        if (activeScreen === AUTH_SCREENS.VALIDATE_PWD_PAGE) {
            loginPurpose = LOGIN_PURPOSE.SET_PASSWORD;
        }
        dispatch({
            type: sagaActions.AUTH.GENERATE_OTP,
            payload: { loginPurpose },
        });
    };

    const handleClickPwdLogin = () => {
        dispatch({
            type: sagaActions.AUTH.GENERATE_OTP,
            payload: { loginPurpose: LOGIN_PURPOSE.SET_PASSWORD },
        });
    };

    const handleSubmitLoginWithPwd = (e: SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            password,
        };
        if (password) {
            dispatch({ type: sagaActions.AUTH.VALIDATE_PASSWORD, payload });
            setIsForgotPwdClick(false);
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

    const handleResendOtp = () => {
        dispatch({ type: sagaActions.AUTH.RESEND_OTP });
        if (!timer) {
            setTimer(30);
        }
        setOtp('');
    };

    const handlesetPasswordSubmit = (e: SyntheticEvent) => {
        e.preventDefault();

        if (password.length < 6) {
            dispatch(
                setDialogOpen({
                    title: 'Invalid Password',
                    content: 'Password must be atleast 6 characters',
                })
            );
        }
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
            setIsForgotPwdClick(false);
        }
    };

    const handleClickEditEmail = () => {
        dispatch(setActiveAuthScreen(AUTH_SCREENS.HOME_PAGE));
        setIsForgotPwdClick(false);
        setTimer(30);
    };

    const handleForgotPwdClick = () => {
        dispatch(setActiveAuthScreen(AUTH_SCREENS.VALIDATE_OTP_PAGE));
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
            // case AUTH_SCREENS.VALIDATE_PWD_PAGE:
            //    return (
            //        <EnterPasswordScreen
            //            password={password}
            //            setPassword={setPassword}
            //            showPassword={showPassword}
            //            setShowPassword={setShowPassword}
            //            handleEnterPasswordSubmit={handleEnterPasswordSubmit}
            //            isAuthLoading={isAuthLoading}
            //        />
            //    );
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
