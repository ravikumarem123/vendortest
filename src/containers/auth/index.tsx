import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../reduxInit/hooks';
import { sagaActions } from '../../reduxInit/sagaActions';
import { events, sendEvents } from '../../appEvents';
import AuthContainer from './AuthContainer';
import { 
	EnterOtpScreen, 
	EnterPasswordScreen, 
	HomePageScreen, 
	SelectAuthTypeScreen,
	SetPasswordScreen 
} from './AuthScreen.tsx';
import { AUTH_SCREENS } from './authTypes';
import { getActiveScreen, getIsAuthLoading } from './authSelector';
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
			emailId
		};
		if (emailId) {
			dispatch({ type: sagaActions.AUTH.VERIFY_EMAIL, payload });
		}
	};

	const handleOtpSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const payload = {
			otp
		};
		if (otp) {
			dispatch({ type: sagaActions.AUTH.VERIFY_OTP, payload });
		}
	};

	const handlesetPasswordSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const payload = {
			password,
			verifyPassword
		};
		if (otp) {
			dispatch({ type: sagaActions.AUTH.SET_PASSWORD , payload });
		}
	};

	const handleEnterPasswordSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const payload = {
			password
		};
		if (otp) {
			dispatch({ type: sagaActions.AUTH.VALIDATE_PASSWORD, payload });
		}
	};

	const handleClickEditEmail = () => {
		console.log("email edit clicked, navigate to home screen");
	};

	const renderActiveScreen = (): JSX.Element => {
		
		switch(activeScreen) {
			case AUTH_SCREENS.HOME_PAGE:
				return <HomePageScreen
				emailId={emailId}
				setEmailId={setEmailId}
				handleEmailSubmit={handleEmailSubmit}
				isAuthLoading={isAuthLoading}
			/>;
			case AUTH_SCREENS.LOGIN_WITH_OTP_AND_SET_PWD_PAGE:
				return <SelectAuthTypeScreen 
				email={emailId}
				isAuthLoading={isAuthLoading}
				editFn={handleClickEditEmail}
			/>;
			case AUTH_SCREENS.VALIDATE_OTP_PAGE:
				return <EnterOtpScreen
				otp={otp}
				setOtp={setOtp}
				handleOtpSubmit={handleOtpSubmit}
				isAuthLoading={isAuthLoading}
			/>;
			case AUTH_SCREENS.SET_PWD_PAGE:
				return <SetPasswordScreen 
				password={password}
				setPassword={setPassword}
				verifyPassword={verifyPassword}
				setVerifyPassword={setVerifyPassword}
				showPassword={showPassword}
				setShowPassword={setShowPassword}
				handlesetPasswordSubmit={handlesetPasswordSubmit}
				isAuthLoading={isAuthLoading}
			/>;
			case AUTH_SCREENS.VALIDATE_PWD_PAGE:
				return <EnterPasswordScreen
				password={password}
				setPassword={setPassword}
				showPassword={showPassword}
				setShowPassword={setShowPassword}
				handleEnterPasswordSubmit={handleEnterPasswordSubmit}
				isAuthLoading={isAuthLoading}
			/>;
			default: 
				return <HomePageScreen
				emailId={emailId}
				setEmailId={setEmailId}
				handleEmailSubmit={handleEmailSubmit}
				isAuthLoading={isAuthLoading}
			/>;
		};
	};

	return (
		<AuthContainer>
			{renderActiveScreen()}
		</AuthContainer>
	);
};

export default Login;