import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../reduxInit/hooks';
import { Loginhead, Partnership } from '../../assets';
import { InputAdornment, IconButton } from '@mui/material';
import { sagaActions } from '../../reduxInit/sagaActions';
import './auth.css';
import { events, sendEvents } from '../../appEvents';


const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#323F8B !important', // Change the background color
		height: '50px', // Change the height
		width: '330px',
		//fontSize: '16px',
		'&:hover': {
			backgroundColor: '#323F8B', // Change the background color on hover
		},
	},
}));

const Login = () => {
	const [emailId, setEmailId] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const buttonClasses = useStyles();
	const navigate = useNavigate();

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const handleLogin = () => {
		const payload = {
			emailId,
			password,
			navigate
		};
		if (emailId && password) {
			sendEvents(events.ON_CLICK_LOGIN, {
				email: emailId
			});
			dispatch({ type: sagaActions.LOGIN, payload });
		}
	};

	return (
		<div className="login-page">

			<div className='login-white-box'>
				<div className='head-img-container'>
					<img src={Partnership} alt='login' className='login-head-img' />
				</div>

				<h2 className='login-header'>Login</h2>


				<form>
					<div className='input-fields'>
						<TextField
							label="E-mail"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{
								style: { width: '300px' },
							}}
							placeholder="Enter email"
							className='login-input'
							sx={{ display: 'block' }}
							value={emailId}
							required
							onChange={(e) => setEmailId(e.target.value)}
						/>

						<TextField
							label="Password"
							type={showPassword ? "text" : "password"}
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
										>
											{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
										</IconButton>
									</InputAdornment>
								)
							}}
							inputProps={{
								style: { width: '255px' },
							}}
							placeholder="Enter password"
							className='login-input'
							sx={{ display: 'block' }}
							value={password}
							required
							onChange={(e) => setPassword(e.target.value)}
						/>

						<Button
							variant="contained"
							classes={{ root: buttonClasses.root }}
							onClick={handleLogin}
						>Login</Button>
					</div>
				</form>




			</div >
		</div >
	);
};

export default Login;