import apiHandler from './apiHandler';

const apiRepository = {
    // TODO: type the data properly in create payload
    getPodInfo(data: object) {
        const URL = 'invoice/v1/get/pod-info';
        return apiHandler.post(URL, data);
    },
    login(data: object) {
        const URL = 'v1/login';
        return apiHandler.post(URL, data);
    },
    verifyEmail(data: object) {
        const URL = 'v1/login/validate-user-email';
        return apiHandler.post(URL, data);
    },
    generateOTP(data: object) {
        const URL = 'v1/login/generate-otp';
        return apiHandler.post(URL, data);
    },
    resendOTP(data: object) {
        const URL = 'v1/login/resend-otp';
        return apiHandler.post(URL, data);
    },
    verifyOTP(data: object) {
        const URL = 'v1/login/validate-otp';
        return apiHandler.post(URL, data);
    },
    getUTRList(data: object) {
        const URL = 'payments/v1/get-info';
        return apiHandler.post(URL, data);
    },
    getUTRInfo(data: object) {
        const URL = 'payments/v1/get-advice-info';
        return apiHandler.post(URL, data);
    },
    getUTRIngestion(data: object) {
        const URL = 'payments/v1/download/payment-advice';
        return apiHandler.post(URL, data);
    },
    getInvoiceInfo(data: object) {
        const URL = 'invoice/v1/get/info';
        return apiHandler.post(URL, data);
    },
    validatePassword(data: object) {
        const URL = 'v1/login/validate-user-password';
        return apiHandler.post(URL, data);
    },
    setPassword(data: object) {
        const URL = 'v1/login/set-user-password';
        return apiHandler.post(URL, data);
    },
};

export default apiRepository;
