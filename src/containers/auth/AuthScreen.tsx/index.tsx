import { useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { makeStyles } from '@mui/styles';
import AuthHeader from '../AuthHeader';
import {
    IEnterOtpProps,
    IEnterPasswordProps,
    IHomePageProps,
    ILoginWithPasswordProps,
    ISelectAuthTypeProps,
    ISetPasswordProps,
} from '../authTypes';
import { PaymentIdea } from '../../../assets';
import COLORS from '../../../utils/cssutils';

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: `${COLORS.purple} !important`,
        height: '50px',
        width: '330px',
        '&:hover': {
            backgroundColor: COLORS.purple,
        },
        '&:disabled': {
            backgroundColor: `${COLORS.gray} !important`,
            color: `${COLORS.white} !important`,
        },
    },
}));

export const HomePageScreen = ({
    handleEmailSubmit,
    emailId,
    setEmailId,
    isAuthLoading,
}: IHomePageProps) => {
    const { t } = useTranslation();
    const buttonClasses = useStyles();

    return (
        <>
            <AuthHeader
                headText="auth.login"
                subHeadText="auth.enterregemailId"
            />
            <form onSubmit={handleEmailSubmit}>
                <div className="input-fields">
                    <TextField
                        label={t('auth.email')}
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        inputProps={{
                            style: { width: '300px' },
                        }}
                        placeholder={t('auth.enteremail')}
                        className="login-input"
                        sx={{ display: 'block' }}
                        value={emailId}
                        required
                        onChange={(e) => setEmailId(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isAuthLoading}
                        classes={{ root: buttonClasses.root }}
                    >
                        {t('auth.next')}
                    </Button>
                </div>
            </form>
        </>
    );
};

export const SelectAuthTypeScreen = ({
    email,
    isAuthLoading,
    handleClickOtpLogin,
    handleClickPwdLogin,
}: ISelectAuthTypeProps) => {
    const { t } = useTranslation();

    return (
        <>
            <AuthHeader
                headText="auth.login"
                subHeadText="auth.pleaseselectlogin"
            />
            <div className="input-fields">
                <Button
                    variant="outlined"
                    type="submit"
                    className="outline-login-btn"
                    disabled={isAuthLoading}
                    onClick={handleClickOtpLogin}
                >
                    {t('auth.emailotp')}
                </Button>

                <div className="or-section">
                    <div className="or-line" />
                    <div className="or-text">OR</div>
                    <div className="or-line" />
                </div>

                <Button
                    variant="outlined"
                    type="submit"
                    className="outline-login-btn"
                    onClick={handleClickPwdLogin}
                >
                    {t('auth.setpass')}
                </Button>

                <div className="auth-type-info-box">
                    <p>
                        <img
                            src={PaymentIdea}
                            alt="info"
                            className="info-idea-img"
                        />
                        Note: OTP will be sent to you on
                    </p>
                    <p className="login-header-email">
                        <span>{email}</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export const EnterOtpScreen = ({
    email,
    handleOtpSubmit,
    otp,
    setOtp,
    isAuthLoading,
    handleResendOtp,
    timer,
    setTimer,
    isForgotPwdClick,
}: IEnterOtpProps) => {
    const { t } = useTranslation();
    const buttonClasses = useStyles();

    const timeOutCallback = useCallback(
        () => setTimer((currTimer) => currTimer - 1),
        [setTimer]
    );

    useEffect(() => {
        if (timer > 0) {
            setTimeout(timeOutCallback, 1000);
        }
    }, [timer, timeOutCallback]);

    const timerState = timer < 10 ? `0${timer}` : timer;

    return (
        <>
            <AuthHeader
                headText={isForgotPwdClick ? 'auth.forgotPwd' : 'auth.emailotp'}
                subHeadText="auth.pleaseenterotp"
                email={email}
            />
            <form onSubmit={handleOtpSubmit}>
                <div className="input-fields">
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span> </span>}
                        inputStyle="otp-input"
                        containerStyle="otp-input-container"
                        renderInput={(props) => <input {...props} />}
                    />

                    {timer > 0 ? (
                        <p className="footerText-otp">
                            You can resend OTP in{' '}
                            <span className="mobile-number">{`00:${timerState}`}</span>
                        </p>
                    ) : (
                        <p
                            className="footerText-otp mobile-number"
                            onClick={handleResendOtp}
                        >
                            Resend OTP
                        </p>
                    )}

                    <Button
                        variant="contained"
                        type="submit"
                        classes={{ root: buttonClasses.root }}
                        disabled={otp.length < 1 || isAuthLoading}
                    >
                        {t('auth.login')}
                    </Button>
                </div>
            </form>
        </>
    );
};

export const SetPasswordScreen = ({
    password,
    setPassword,
    verifyPassword,
    setVerifyPassword,
    showPassword,
    setShowPassword,
    handlesetPasswordSubmit,
}: ISetPasswordProps) => {
    const { t } = useTranslation();
    const buttonClasses = useStyles();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const isDisabled = !(
        password.length > 0 &&
        verifyPassword.length > 0 &&
        password === verifyPassword
    );

    return (
        <>
            <AuthHeader
                headText="auth.setpass"
                subHeadText="auth.enternewpass"
                icon={<InfoOutlinedIcon />}
            />
            <form onSubmit={handlesetPasswordSubmit}>
                <div className="input-fields">
                    <TextField
                        label={t('auth.password')}
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
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
                                        {showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: { width: '330px' },
                        }}
                        placeholder={t('auth.enterpassword')}
                        className="login-input"
                        sx={{ display: 'block' }}
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        label={t('auth.reenterpassword')}
                        type={showPassword ? 'text' : 'password'}
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
                                        {showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: { width: '330px' },
                        }}
                        placeholder={t('auth.enterpasswordagain')}
                        className="login-input"
                        sx={{ display: 'block' }}
                        value={verifyPassword}
                        required
                        onPaste={(e) => e.preventDefault()}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        type="submit"
                        classes={{ root: buttonClasses.root }}
                        disabled={isDisabled}
                    >
                        {t('auth.continue')}
                    </Button>
                </div>
            </form>
        </>
    );
};

export const EnterPasswordScreen = ({
    password,
    setPassword,
    showPassword,
    setShowPassword,
    handleEnterPasswordSubmit,
    isAuthLoading,
}: IEnterPasswordProps) => {
    const { t } = useTranslation();
    const buttonClasses = useStyles();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <>
            <AuthHeader headText="auth.password" subHeadText="auth.enterpass" />
            <form onSubmit={handleEnterPasswordSubmit}>
                <div className="input-fields">
                    <TextField
                        label={t('auth.password')}
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
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
                                        {showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: { width: '330px' },
                        }}
                        placeholder={t('auth.enterpassword')}
                        className="login-input"
                        sx={{ display: 'block' }}
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        variant="contained"
                        type="submit"
                        classes={{ root: buttonClasses.root }}
                        disabled={isAuthLoading || password.length < 1}
                    >
                        {t('auth.login')}
                    </Button>
                </div>
            </form>
        </>
    );
};

export const LoginWithPassword = ({
    email,
    password,
    setPassword,
    isAuthLoading,
    showPassword,
    setShowPassword,
    handleClickOtpLogin,
    handleSubmitLoginWithPwd,
    handleForgotPwdClick,
}: ILoginWithPasswordProps) => {
    const { t } = useTranslation();
    const buttonClasses = useStyles();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <div className="login-with-pwd-container">
            <AuthHeader
                headText="auth.login"
                subHeadText="auth.enterpwdtologin"
                email={email}
            />

            <form onSubmit={handleSubmitLoginWithPwd}>
                <div className="input-fields">
                    <TextField
                        label={t('auth.password')}
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
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
                                        {showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            style: { width: '330px' },
                        }}
                        placeholder={t('auth.enterpassword')}
                        className="login-input"
                        sx={{ display: 'block' }}
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <p className="fp-text" onClick={handleForgotPwdClick}>
                        Forgot Password
                    </p>

                    <Button
                        variant="contained"
                        type="submit"
                        classes={{ root: buttonClasses.root }}
                        disabled={password.length < 1}
                    >
                        {t('auth.login')}
                    </Button>

                    <div className="or-section">
                        <div className="or-line" />
                        <div className="or-text">OR</div>
                        <div className="or-line" />
                    </div>

                    <Button
                        variant="outlined"
                        type="submit"
                        className="outline-login-btn"
                        disabled={isAuthLoading}
                        onClick={handleClickOtpLogin}
                    >
                        {t('auth.loginwithemailotp')}
                    </Button>
                </div>
            </form>
        </div>
    );
};
