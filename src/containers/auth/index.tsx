import { SyntheticEvent, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../reduxInit/hooks';
import { JeetLogo } from '../../assets';
import { InputAdornment, IconButton } from '@mui/material';
import AuthHeader from './AuthHeader';
import { sagaActions } from '../../reduxInit/sagaActions';
import { events, sendEvents } from '../../appEvents';
import './auth.css';
import AuthContainer from './AuthContainer';
import { EnterOtpScreen, HomePageScreen, SelectAuthTypeScreen } from './AuthScreen.tsx';


const Login = () => {
	const [emailId, setEmailId] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [otp, setOtp] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleEmailSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		const payload = {
			emailId,
			password,
			navigate
		};
		if (emailId && password) {
			sendEvents(events.ON_CLICK_LOGIN, {
				email: emailId,
				screen: 'LOGIN'
			});
			dispatch({ type: sagaActions.LOGIN, payload });
		}
	};

	const handleOtpSubmit = (e: SyntheticEvent) => {
		console.log("Handle otp submit");
	};

	return (
		<AuthContainer>
			{/*<HomePageScreen
				emailId={emailId}
				setEmailId={setEmailId}
				handleEmailSubmit={handleEmailSubmit}
			/>*/}

			{/*<SelectAuthTypeScreen 
				email={emailId}
				editFn={() => console.log("hi")}
			/>*/}
			
			<EnterOtpScreen
				otp={otp}
				setOtp={setOtp}
				handleOtpSubmit={handleOtpSubmit}
			/>
			
		</AuthContainer>
	);
};

export default Login;