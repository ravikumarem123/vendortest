import {JeetLogo}  from '../../assets/index';

interface IProps {
	children: JSX.Element | JSX.Element[];
};

function AuthContainer({ children }: IProps) {
	return (
		<div className="login-page">
			<div className='login-white-box'>
				<div className='head-img-container'>
					<img src={JeetLogo} alt='login' className='login-head-img' />
				</div>
				{children}
			</div>
		</div>
	);
};

export default AuthContainer;