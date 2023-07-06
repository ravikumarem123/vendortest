import { JeetLogo } from '../../assets/index';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const AuthContainer = ({ children }: IProps) => {
    console.log('auth container 2');
    return (
        <div className="login-page">
            <div className="login-white-box">
                <div className="head-img-container">
                    <img
                        src={JeetLogo}
                        alt="login"
                        className="login-head-img"
                    />
                </div>
                <p>Login 5</p>
                {children}
            </div>
        </div>
    );
};

export default AuthContainer;
