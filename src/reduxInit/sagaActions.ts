const sagaActions = {
    AUTH: {
        VERIFY_EMAIL: 'VERIFY_EMAIL',
        GENERATE_OTP: 'GENERATE_OTP',
        VERIFY_OTP: 'VERIFY_OTP',
        VALIDATE_PASSWORD: 'VALIDATE_PASSWORD',
        SET_PASSWORD: 'SET_PASSWORD',
        RESEND_OTP: 'RESEND_OTP',
        LOGOUT: 'LOGOUT',
    },
    FETCH_OTP: 'FETCH_OTP',
    FETCH_POD_DETAILS: 'FETCH_POD_DETAILS',
    LOGIN: 'LOGIN',
    FETCH_PAYMENT_DETAILS: 'FETCH_PAYMENT_DETAILS',
    FETCH_UTR_DETAILS: 'FETCH_UTR_DETAILS',
    FETCH_UTR_INGESTION: 'FETCH_UTR_INGESTION',
    FETCH_INVOICE_DETAILS: 'FETCH_INVOICE_DETAILS',
};

export default sagaActions;
