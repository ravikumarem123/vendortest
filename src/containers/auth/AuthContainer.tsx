import { JeetLogo } from '../../assets/index';

interface IProps {
    children: JSX.Element | JSX.Element[];
}

const AuthContainer = ({ children }: IProps) => {
    console.log('inside authcontainer');
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
                <p>Login 3</p>
                {children}
            </div>
        </div>
    );
};

export default AuthContainer;
