import { useTranslation } from 'react-i18next';
import OtpInput from 'react-otp-input';
import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
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
    editFn,
    isAuthLoading,
    handleClickOtpLogin,
    handleClickPwdLogin,
}: ISelectAuthTypeProps) => {
    const { t } = useTranslation();

    return (
        <>
            <AuthHeader
                headText="auth.authentication"
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

                <p className="gray-text or-separator">OR</p>

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
                            style={{ width: '19px' }}
                        />
                        Note: OTP will be sent to you on
                    </p>
                    <p className="login-header-email">
                        <span>{email}</span>
                        <EditIcon
                            className="login-header-email-edit-icon"
                            onClick={editFn}
                            style={{ fontSize: '12px' }}
                        />
                    </p>
                </div>
            </div>
        </>
    );
};

export const EnterOtpScreen = ({
    email,
    editFn,
    handleOtpSubmit,
    otp,
    setOtp,
    isAuthLoading,
}: IEnterOtpProps) => {
    const { t } = useTranslation();
    const buttonClasses = useStyles();

    return (
        <>
            <AuthHeader
                headText="auth.emailotp"
                subHeadText="auth.pleaseenterotp"
                email={email}
                editFn={editFn}
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
    isAuthLoading,
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
                        disabled={isAuthLoading}
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
    editFn,
    password,
    setPassword,
    isAuthLoading,
    showPassword,
    setShowPassword,
    handleClickOtpLogin,
    handleSubmitLoginWithPwd,
}: ILoginWithPasswordProps) => {
    const { t } = useTranslation();
    const buttonClasses = useStyles();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <>
            <AuthHeader
                headText="auth.password"
                subHeadText="auth.enterpwdtologin"
                email={email}
                editFn={editFn}
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

                    <Button
                        variant="contained"
                        type="submit"
                        classes={{ root: buttonClasses.root }}
                        disabled={password.length < 1}
                    >
                        {t('auth.login')}
                    </Button>

                    <p className="gray-text or-separator">OR</p>

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
        </>
    );
};
