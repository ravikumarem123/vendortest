import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../reduxInit/hooks';
import { Loginhead, Partnership } from '../../assets';
import { sagaActions } from '../../reduxInit/sagaActions';
import './auth.css';


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
	const dispatch = useAppDispatch();
	const buttonClasses = useStyles();
	const navigate = useNavigate();

	const handleLogin = () => {
		const payload = {
			emailId,
			password,
			navigate
		};
		if (emailId && password) {
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
							type="password"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{
								style: { width: '300px' },
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