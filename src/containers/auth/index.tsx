
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { Loginhead, Partnership } from '../../assets';
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

	const buttonClasses = useStyles();

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
							id="outlined-basic"
							label="E-mail"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{
								style: { width: '300px' },
							}}
							placeholder="Type here"
							className='login-input'
							sx={{ display: 'block' }}
						/>

						<TextField
							id="outlined-basic"
							label="Password"
							type="password"
							variant="outlined"
							InputLabelProps={{
								shrink: true,
							}}
							inputProps={{
								style: { width: '300px' },
							}}
							placeholder="Type here"
							className='login-input'
							sx={{ display: 'block' }}
						/>

						<Button
							variant="contained"
							classes={{ root: buttonClasses.root }}
						>Login</Button>
					</div>
				</form>




			</div >
		</div >
	);
};

export default Login;